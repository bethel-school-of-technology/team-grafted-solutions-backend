import { RequestHandler } from 'express'
import { Post } from '../models/post'
import { User } from '../models/user'
import { verifyUser } from '../services/auth'
import { createMusicPage } from './musicPageController'

export const getAllPosts: RequestHandler = async (req, res, next) => {
  let posts = await Post.findAll()
  res.status(200).json(posts)
}

export const getOnePost: RequestHandler =async (req, res, next) => {
  let postId = req.params.postId;
  let post = await Post.findByPk(postId);
  res.status(200).json(post);
}

export const createPost: RequestHandler = async (req, res, next) => {

  let user: User | null = await verifyUser(req, res, next);

  if (!user) {
    return res.status(403).send('User not detected.')
  }

  if (!pageId) {
    let firstPost: MusicPage = await createMusicPage(id)
  }

  let newPost: Post = req.body;
  newPost.userId = user.userId;
  newPost.display_name = user.display_name;
  console.log(newPost.userId);
  console.log(newPost);

  if (newPost.title && newPost.message) {
    let created = await Post.create(newPost);
    res.status(201).json(created);
  } else {
    res.status(400).send('Please include userId, display_name, title, and message')
  }
}

export const editPost: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req, res, next);

  if (!user) {
    return res.status(403).send('User not detected');
  }

  let postId = req.params.postId;
  let userId = user.userId;
  console.log(req.body);

  let updatedPost: Post = req.body;
  let postFound = await Post.findByPk(postId);

  if (postFound && postFound.postId && postFound.userId == userId) {
    await Post.update(updatedPost, {
      where: { 
        postId: postId,
        userId: userId
      }
    });
    res.status(200).json('Updated post is a success!');
  }
  else {
    res.status(400).json('An error occured while updating this post');
  }
}

export const deletePost: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req, res, next);

  if (!user) {
    return res.status(403).send('User not detected');
  }

  let postId = req.params.postId;
  let userId = user.userId;
  console.log(req.body);

  let postFound = await Post.findByPk(postId);

  if (postFound && postFound.userId == userId) {
    await Post.destroy({
      where: {
        postId: postId,
        userId: userId
      }
    });
    res.status(200).json('Post deleted!');
  }
  else {
    res.status(404).json('An error occured while deleting this post');
  }
}