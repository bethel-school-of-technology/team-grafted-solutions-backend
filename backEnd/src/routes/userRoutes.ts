import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/userController';

const router = Router();

router.get('/:userId', getUserById);
router.get('/', getAllUsers);

export default router;
