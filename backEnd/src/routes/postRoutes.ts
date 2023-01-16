import { Router } from 'express';
import { createPost, deletePost, editPost, getAllPosts, getOnePost } from '../controllers/postController';

const router = Router();

router.get('/', getAllPosts);
router.get('/:postId', getOnePost);
router.post('/', createPost);
router.put('/:postId', editPost);
router.delete('/:postId', deletePost);

export default router;
