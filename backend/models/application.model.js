import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    jobPosting: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },
    resumeLink: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['submitted', 'shortlisted', 'rejected', 'interview'], 
        default: 'submitted' 
    },
    submissionDate: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', applicationSchema);
export default Application;
