import { Router } from 'express';
import { getAllUsers, getUserById, searchUsers, currentUser } from '../controllers/userController';

const router = Router();

router.get('/:userId', getUserById);
router.get('/', getAllUsers);
router.get('/get/currentUser', currentUser);
router.get('/search/:searchTerm', searchUsers);

export default router;
