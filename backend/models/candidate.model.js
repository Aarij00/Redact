import mongoose from "mongoose";

// Helper function to generate a random 4-character alphanumeric ID
function generateUniqueId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueId = '';
    for (let i = 0; i < 4; i++) {
        uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uniqueId;
}

const candidateSchema = new mongoose.Schema(
    {
        uniqueId: { type: String, required: true, unique: true }, // anonymized unique identifier
        email: { type: String, required: true }, // original email
        anonymizedEmail: { type: String, unique: true }, // anonymized email for communication
        redactedResume: { type: String }, // path or URL to the redacted PDF
        linkedInProfile: { type: String }, // optional LinkedIn URL
        githubProfile: { type: String }, // optional GitHub URL
        jobPosting: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting' }, // reference to the job posting
        dateApplied: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// Pre-save middleware to generate a unique 4-character ID
candidateSchema.pre('validate', async function (next) {
    if (!this.uniqueId) {
        let newId;
        let exists;
        do {
            newId = generateUniqueId();
            // Check if the generated ID already exists in the database
            exists = await mongoose.models.Candidate.findOne({ uniqueId: newId });
        } while (exists);

        this.uniqueId = newId;
    }
    next();
});

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;