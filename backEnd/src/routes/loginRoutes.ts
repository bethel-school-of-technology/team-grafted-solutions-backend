import { Router } from 'express';
import { createUser, loginUser } from '../controllers/loginController';
import { currentUser } from '../controllers/userController';

const router = Router();

router.post('/', loginUser, createUser, currentUser);

export default router;
