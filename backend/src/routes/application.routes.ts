import { Router } from 'express';

const router = Router();

// Get all applications
router.get('/', async (req, res) => {
  // TODO: Implement controller
});

// Get application by ID
router.get('/:id', async (req, res) => {
  // TODO: Implement controller
});

// Create new application
router.post('/', async (req, res) => {
  // TODO: Implement controller
});

// Update application status
router.patch('/:id/status', async (req, res) => {
  // TODO: Implement controller
});

// Delete application
router.delete('/:id', async (req, res) => {
  // TODO: Implement controller
});

export default router; 