import { Router } from 'express';
import { authMiddleware, employerOnly } from '../middlewares/auth.middleware';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobApplications,
  getJobContracts,
  getJobSuggestions,
  applyForJob
} from '../controllers/job.controller';
// import aiController from '../controllers/aiController';

const router = Router();

// Public routes
router.get('/', getAllJobs);
// Job suggestions (protected)
router.get('/suggestions',authMiddleware, getJobSuggestions);
router.get('/:id', getJobById);

// Protected routes
router.use(authMiddleware);



// Employer only routes
router.post('/', employerOnly, createJob);
router.put('/:id', employerOnly, updateJob);
router.delete('/:id', employerOnly, deleteJob);
router.get('/:id/applications', employerOnly, getJobApplications);
router.get('/:id/contracts', employerOnly, getJobContracts);

// Student routes
router.post('/:id/apply', applyForJob);

//for ai 
// router.get('/ai/job-recommendations', aiController.getJobRecommendations);
// router.get('/jobs/:jobId/top-freelancers', aiController.getTopFreelancersForJob);
// router.post('/jobs/:jobId/auto-match', aiController.autoMatchJob);

export default router; 