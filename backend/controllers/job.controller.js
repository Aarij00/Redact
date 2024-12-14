import multer from 'multer';
import Candidate from '../models/candidate.model.js';
import JobPosting from "../models/jobPosting.model.js";

// Multer configuration for PDF files
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 6 * 1024 * 1024 // 6MB limit
    }
}).single('resume');

export const getAllJobPostings = async (req, res) => {
    try {
        const jobs = await JobPosting.find()
        .select('-candidates -hrManager -shortlistedCandidates')

        if (jobs.length === 0) {
            return res.status(200).json([]);
        }
        // console.log(jobs.length);
        res.status(200).json(jobs);
    } catch (error) {
        console.log("Error in getAllJobs controller: ", error);
		res.status(500).json({ error: "Internal server error" });
    }
}

export const getJobPosting = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await JobPosting.findOne({ _id: jobId});
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        console.log("Error in getJob: ", error.message);
		res.status(500).json({ error: error.message });
    }
}

export const getConfirmation = async (req, res) => {
    try {
        res.status(200).json({message: "Application Confirmed!"});
    } catch (error) {
        console.log("Error in getConfirmation: ", error.message);
		res.status(500).json({ error: error.message });
    }
}

// Controller function to handle file upload
export const applyForJob = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'File upload error', details: err.message });
            } else if (err) {
                return res.status(500).json({ error: 'Unknown error', details: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            try {
                const { email, linkedInProfile, githubProfile } = req.body;
                const newCandidate = new Candidate({
                    email: email,
                    originalResume: {
                        data: req.file.buffer,
                        contentType: 'application/pdf',
                        filename: req.file.originalname
                    },
                    linkedInProfile: linkedInProfile,
                    githubProfile: githubProfile
                });

                await newCandidate.save();

                // Update JobPosting with the new candidate
                await JobPosting.findByIdAndUpdate(
                    req.params.jobId,
                    { $push: { candidates: newCandidate._id } },
                    { new: true }
                );

                res.status(200).json({ 
                    message: 'Application submitted successfully', 
                    candidateId: newCandidate._id,
                    anonymizedEmail: newCandidate.anonymizedEmail 
                });
            } catch (saveError) {
                console.error('Error saving application:', saveError);
                if (saveError.message.includes('anonymous email')) {
                    return res.status(503).json({ error: 'Unable to generate anonymous email. Please try again.' });
                }
                res.status(500).json({ error: 'Error saving application' });
            }
        });
    } catch (error) {
        console.error("Error handling application:", error);
        res.status(500).json({ error: "Error handling application" });
    }
};

// Controller function to retrieve a resume by ID
export const getResumeById = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate || !candidate.originalResume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${candidate.originalResume.filename}"`);
        res.send(candidate.originalResume.data);

    } catch (error) {
        console.error('Error retrieving resume:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};