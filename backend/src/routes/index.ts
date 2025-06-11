import { Router } from 'express';
import userRoutes from './user.routes';
import jobRoutes from './job.routes';
import workshopRoutes from './workshop.routes';
import applicationRoutes from './application.routes';
import contractRoutes from './contract.routes';
import reviewRoutes from './review.routes';

const router = Router();

// Mount routes
router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/workshops', workshopRoutes);
router.use('/applications', applicationRoutes);
router.use('/contracts', contractRoutes);
router.use('/reviews', reviewRoutes);

export default router; 