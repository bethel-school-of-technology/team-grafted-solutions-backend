import { Router } from 'express';
import { createSong, currentUserSongs, getAllSongs } from '../controllers/songController';

const router = Router();

router.get('/', getAllSongs);
router.get('/:username', currentUserSongs);
router.post('/', createSong);

export default router;
