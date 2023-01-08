import { Router } from 'express';
import { getAllUsers, currentUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.post('/currentUser', currentUser);

export default router;
