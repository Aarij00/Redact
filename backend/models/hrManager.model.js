import mongoose from "mongoose";

const hrManagerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }, // securely hashed password for login
        jobPostings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', default: [] }], // list of job postings managed
        dateCreated: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

const HRManager = mongoose.model('HRManager', hrManagerSchema);
export default HRManager;