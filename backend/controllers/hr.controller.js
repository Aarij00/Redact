import mongoose from 'mongoose';
import JobPosting from "../models/jobPosting.model.js";
import Candidate from "../models/candidate.model.js";

export const getDashboard = async (req, res) => {
    try {
        const hrId = req.params.hrId;
        // console.log("hiigfuyfugv", hrId);
        const jobs = await JobPosting.find({ hrManager: new mongoose.Types.ObjectId(hrId)});

        if (jobs.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(jobs);
    } catch (error) {
        console.log("Error in getDashboard controller: ", error);
		res.status(500).json({ error: "Internal server error" });
    }
}

export const getJobPostingToEdit = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        console.log(jobId);

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: 'Invalid Job ID' });
        }
        const job = await JobPosting.findOne({ _id: new mongoose.Types.ObjectId(jobId)});

        if (!job) {
            return res.status(404).json({ message: "job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        console.log("Error in getJobPostingToEdit controller: ", error);
		res.status(500).json({ error: "Internal server error" });
    }
}

export const editJobPosting = async (req, res) => {
    try {
        const { jobId } = req.params;
        const updatedData = req.body;
        
        if (!updatedData.description || updatedData.description.trim() === '') {
          return res.status(400).json({ message: 'Description is required' });
        }
        
        const updatedJob = await JobPosting.findByIdAndUpdate(
            new mongoose.Types.ObjectId(jobId),
            updatedData,
            { new: true, runValidators: true }
        );
        
        if (!updatedJob) {
          return res.status(404).json({ message: "Job posting not found" });
        }
        
        res.status(200).json(updatedJob);
        
        
    } catch (error) {
        console.log("Error in editJobPosting controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getCandidatesForJob = async (req, res) => {
    try {
        const { jobId } = req.params; // Extract jobId from the route parameters

        // Find the job posting by ID and populate the candidates field
        const job = await JobPosting.findById(new mongoose.Types.ObjectId(jobId)).populate('candidates');

        if (!job) {
            return res.status(404).json({ message: "Job posting not found" });
        }

        // Return the list of candidates
        res.status(200).json(job.candidates);
    } catch (error) {
        console.log("Error in getCandidatesForJob controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getShortlistedCandidates = async (req, res) => {
    try {
        const { jobId } = req.params; // Extract jobId from the route parameters

        // Find the job posting by ID and populate the shortlistedCandidates field
        const job = await JobPosting.findById(new mongoose.Types.ObjectId(jobId)).populate('shortlistedCandidates');

        if (!job) {
            return res.status(404).json({ message: "Job posting not found" });
        }

        // Return the list of shortlisted candidates
        res.status(200).json(job.shortlistedCandidates);
    } catch (error) {
        console.log("Error in getShortlistedCandidates controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const shortlistCandidate = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { candidateId } = req.body;

        const job = await JobPosting.findByIdAndUpdate(
            jobId,
            { $addToSet: { shortlistedCandidates: candidateId } }, // Add candidateId only if it doesn't already exist
            { new: true } // Return the updated document
        );

        if (!job) {
            return res.status(404).json({ message: 'Job posting not found' });
        }

        res.status(200).json({ message: 'Candidate shortlisted successfully', job });
    } catch (error) {
        console.error('Error shortlisting candidate:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
