import { Router } from 'express';
import { addFriend, getAllFriends, searchFriends, getFriendsByID, deleteFriendsByID } from '../controllers/friendController';

const router = Router();

router.post('/', addFriend);
router.get('/', getAllFriends);
router.get('/:id', getFriendsByID);
router.get('/:searchTerm', searchFriends);
router.delete('/:id', deleteFriendsByID);

export default router;
