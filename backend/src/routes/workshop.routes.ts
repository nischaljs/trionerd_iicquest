import { Router } from 'express';

const router = Router();

// Get all workshops
router.get('/', async (req, res) => {
  // TODO: Implement controller
});

// Get workshop by ID
router.get('/:id', async (req, res) => {
  // TODO: Implement controller
});

// Create new workshop
router.post('/', async (req, res) => {
  // TODO: Implement controller
});

// Update workshop
router.put('/:id', async (req, res) => {
  // TODO: Implement controller
});

// Delete workshop
router.delete('/:id', async (req, res) => {
  // TODO: Implement controller
});

// Get workshop attendees
router.get('/:id/attendees', async (req, res) => {
  // TODO: Implement controller
});

// Register for workshop
router.post('/:id/register', async (req, res) => {
  // TODO: Implement controller
});

export default router; 