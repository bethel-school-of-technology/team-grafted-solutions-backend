import { Router } from 'express';
import { createMessage, deleteMessage, getAllMessages, getOneMessage } from '../controllers/messageController';

const router = Router();

router.get('/', getAllMessages);
router.get('/:messageId', getOneMessage);
router.post('/', createMessage);
router.delete('/:messageId', deleteMessage);

export default router;
