import express from 'express';
import { getDashboard, getJobPostingToEdit, editJobPosting, getCandidatesForJob, getShortlistedCandidates, shortlistCandidate } from '../controllers/hr.controller.js';

const router = express.Router();

router.get('/dashboard/:hrId', getDashboard);

router.get('/job/edit/:jobId', getJobPostingToEdit);
router.post('/job/edit/:jobId', editJobPosting);

router.get('/view-candidates/:jobId', getCandidatesForJob);

router.get('/view-shortlisted/:jobId', getShortlistedCandidates);

router.post('/jobs/:jobId/shortlist', shortlistCandidate);


export default router;
