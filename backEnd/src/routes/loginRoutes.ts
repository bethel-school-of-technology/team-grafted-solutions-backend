import { Router } from 'express';
import { createUser, loginUser } from '../controllers/loginController';

const router = Router();

router.post('/', loginUser, createUser);

export default router;
