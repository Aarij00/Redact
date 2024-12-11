import mongoose from "mongoose";

const redactedResumeSchema = new mongoose.Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    filePath: { type: String, required: true }, // path to the redacted resume file
    dateGenerated: { type: Date, default: Date.now }
});

const RedactedResume= mongoose.model('RedactedResume', redactedResumeSchema);
export default RedactedResume;