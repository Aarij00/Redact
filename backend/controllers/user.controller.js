import GridFSBucket from 'mongodb';
import multer from 'multer';
import mongoose from 'mongoose';
import FormData from 'form-data';
import axios from 'axios';

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

            uploadStream.on('finish', () => {
                res.status(200).json({ message: 'Resume uploaded successfully', fileId: uploadStream.id });
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

// Controller function to retrieve a resume by ID and send to Flask
export const getResumeById = async (req, res) => {
    try {
        const fileId = req.params.id;

        // Validate the file ID
        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            return res.status(400).json({ error: 'Invalid file ID' });
        }

        // Check if the file exists in the GridFS collection
        const fileExists = await mongoose.connection.db
            .collection('resumes.files')
            .findOne({ _id: new mongoose.Types.ObjectId(fileId) });

        if (!fileExists) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Create a read stream for the file in GridFS
        const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

        // Prepare form data for the Flask server
        const formData = new FormData();
        formData.append('resume', downloadStream, { filename: fileExists.filename });

        // Send the file to the Flask server
        const flaskResponse = await axios.post('http://localhost:5001/api/resume/upload', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        // Return Flask's response to the client
        res.status(200).json(flaskResponse.data);

    } catch (error) {
        console.error("Error retrieving file or sending to Flask:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};