import { Router } from 'express';
import { createMusicPage } from '../controllers/musicPageController';
import { createPost, deletePost, editPost, getAllPosts, getOnePost, getPostsByUser } from '../controllers/postController';

const router = Router();

router.get('/', getAllPosts);
router.get('/:postId', getOnePost);
router.get('/:userId', getPostsByUser)
router.post('/', createPost);
router.put('/:postId', editPost);
router.delete('/:postId', deletePost);

export default router;
