import { Router } from 'express';
import { createSong } from '../controllers/songController';

const router = Router();

router.post('/', createSong);

export default router;
