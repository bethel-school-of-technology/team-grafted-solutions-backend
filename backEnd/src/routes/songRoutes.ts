import { Router } from 'express';
import { createSong, currentUserSongs } from '../controllers/songController';

const router = Router();

router.get('/:username', currentUserSongs);
router.post('/', createSong);

export default router;
