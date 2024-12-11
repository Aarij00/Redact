import express from 'express';
import { getJobPosting, applyForJob, getAllJobPosting, getConfirmation } from '../controllers/job.controller.js';

const router = express.Router();

router.get('/getJob/', getAllJobPosting);
router.get('/getJob/:jobId', getJobPosting);
router.post('/apply/:jobId', applyForJob);

router.get('/confirmation', getConfirmation);

export default router;
