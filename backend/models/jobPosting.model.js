import mongoose from "mongoose";

const jobPostingSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        hrManager: { type: mongoose.Schema.Types.ObjectId, ref: 'HRManager' },
        candidates: [{ type: String, ref: 'Candidate', default: [] }], // list of applied candidates
        status: { type: String, enum: ['open', 'closed'], default: 'open' },
        shortlistedCandidates: [{ type: String, ref: 'Candidate', default: [] }]
    }, 
    { timestamps: true }
);

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);
export default JobPosting;