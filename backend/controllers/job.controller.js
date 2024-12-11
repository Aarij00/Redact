import GridFSBucket from 'mongodb';
import multer from 'multer';
import mongoose from 'mongoose';
import JobPosting from "../models/jobPosting.model.js";
import Candidate from '../models/candidate.model.js';

// Multer configuration for file uploads
const upload = multer({ storage: multer.memoryStorage() }).single('resume');

// Initialize GridFSBucket
let bucket;
mongoose.connection.once('open', () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'resumes',
    });
    console.log('GridFS bucket initialized');
});

export const getAllJobPosting = async (req, res) => {
    try {
        const jobs = await JobPosting.find()
        .select('-candidates -shortlistedCandidates')

        if (jobs.length === 0) {
            return res.status(200).json([]);
        }
        console.log(jobs.length);
        res.status(200).json(jobs);
    } catch (error) {
        console.log("Error in getAllJobs controller: ", error);
		res.status(500).json({ error: "Internal server error" });
    }
}

export const getJobPosting = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await JobPosting.findOne({ _id: new mongoose.Types.ObjectId(jobId)});
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
                console.error('Multer error:', err);
                return res.status(400).json({ error: 'Multer error', details: err.message });
            } else if (err) {
                console.error('Unknown error:', err);
                return res.status(500).json({ error: 'Unknown error', details: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const uploadStream = bucket.openUploadStream(req.file.originalname);
            uploadStream.end(req.file.buffer);

            uploadStream.on('finish', async () => {
                try {
                    // Create a new Candidate entry
                    const newCandidate = new Candidate({
                        name: req.body.name, // Assume name is sent in the request body
                        email: req.body.email, // Assume email is sent in the request body
                        jobPosting: req.params.jobId, // Reference to the job posting
                        resume: uploadStream.id.toString(), // Storing the GridFS file ID
                        dateApplied: new Date() // Current date for when the application is submitted
                    });

                    await newCandidate.save();

                    // Update the JobPosting model to add the candidate reference
                    await JobPosting.findByIdAndUpdate(
                        req.params.jobId,
                        { $push: { candidates: newCandidate._id } }, // Push the new candidate's ID into the candidates array
                        { new: true }
                    );

                    res.status(200).json({ message: 'Application submitted successfully', candidateId: newCandidate._id });
                } catch (saveError) {
                    console.error('Error saving candidate or updating job posting:', saveError);
                    res.status(500).json({ error: 'Error saving candidate details or updating job posting' });
                }
            });


            uploadStream.on('error', (error) => {
                console.error("Error uploading resume:", error);
                res.status(500).json({ error: "Error uploading resume" });
            });
        });
    } catch (error) {
        console.error("Error handling resume upload:", error);
        res.status(500).json({ error: "Error handling file upload" });
    }
};

// Controller function to retrieve a resume by ID
// export const getResumeById = async (req, res) => {
//     try {
//         const fileId = req.params.id;

//         // Validate the file ID
//         if (!mongoose.Types.ObjectId.isValid(fileId)) {
//             return res.status(400).json({ error: 'Invalid file ID' });
//         }

//         // Check if the file exists in the GridFS collection
//         const fileExists = await mongoose.connection.db
//             .collection('resumes.files')
//             .findOne({ _id: new mongoose.Types.ObjectId(fileId) });

//         if (!fileExists) {
//             return res.status(404).json({ error: 'File not found' });
//         }

//         // Open a download stream for the file in GridFS
//         const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

//         // Set headers for binary data
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename="${fileExists.filename}"`);
        
//         // Pipe the stream directly to the response to handle binary data
//         downloadStream.pipe(res);

//         downloadStream.on('error', (error) => {
//             console.error("Error retrieving file:", error);
//             res.status(500).json({ error: "Error retrieving file" });
//         });

//         downloadStream.on('end', () => {
//             console.log('File retrieval completed.');
//         });
//     } catch (error) {
//         console.error("Error retrieving file:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };