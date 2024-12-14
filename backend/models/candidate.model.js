import mongoose from "mongoose";
import axios from 'axios';

// Helper function to generate a random 4-character alphanumeric ID
function generateUniqueId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 6;
    let uniqueId = '';
    for (let i = 0; i < length; i++) {
        uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uniqueId;
}

async function generateAnonAddyAlias(originalEmail) {
    try {
        const response = await axios.post('https://app.anonaddy.com/api/v1/aliases', {
            domain: 'anonaddy.me',
            description: `Job Application - ${new Date().toISOString()}`
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.ANONADDY_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        return response.data.data.email;
    } catch (error) {
        console.error('Error generating AnonAddy alias:', error);
        throw new Error('Failed to generate anonymous email address');
    }
}

const candidateSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        anonymizedEmail: { type: String, unique: true },
        originalResume: {
            data: Buffer,
            contentType: String,
            filename: String
        },
        redactedResume: {
            data: Buffer,
            contentType: String,
            filename: String
        },
        linkedInProfile: { type: String },
        githubProfile: { type: String },
    },
    { timestamps: true }
);

// Pre-save middleware to generate a unique ID
candidateSchema.pre('save', async function (next) {
    try {
        if (!this._id) {
            let attempts = 0;
            const maxAttempts = 10;
            
            do {
                if (attempts >= maxAttempts) {
                    throw new Error('Failed to generate unique ID after multiple attempts');
                }
                this._id = generateUniqueId();
                attempts++;
            } while (await mongoose.models.Candidate.findOne({ _id: this._id }));
        }

        if (!this.anonymizedEmail) {
            this.anonymizedEmail = await generateAnonAddyAlias(this.email);
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;