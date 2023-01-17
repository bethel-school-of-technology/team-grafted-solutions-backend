import { Router } from 'express';
import { getAllUsers, getUserById, searchUsers } from '../controllers/userController';

const router = Router();

router.get('/:userId', getUserById);
router.get('/', getAllUsers);
router.get('/search/:searchTerm', searchUsers);

export default router;
