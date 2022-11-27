import { Router } from 'express';
import { createMessage, getAllMessages, } from '../controllers/messageController';

const router = Router();

router.get('/', getAllMessages);

router.post('/', createMessage);

export default router;
