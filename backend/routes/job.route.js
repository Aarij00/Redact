import express from 'express';
import { getJobPostings, applyForJob, getAllJobPosting, getConfirmation } from '../controllers/job.controller.js';

const router = express.Router();

router.get('/get-all/', getAllJobPostings);
router.get('/get-one/:jobId', getJobPosting);
router.post('/apply/:jobId', applyForJob);

router.get('/confirmation', getConfirmation);

export default router;
