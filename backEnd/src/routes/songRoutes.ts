import { Router } from 'express';
import { createSong, currentUserSongs, getAllSongs, songSearch } from '../controllers/songController';

const router = Router();

router.get('/', getAllSongs);
router.post('/search/:searchTerm', songSearch);
router.get('/:username', currentUserSongs);
router.post('/', createSong);

export default router;
