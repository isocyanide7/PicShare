const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
let DUMMY_POSTS = require("../data/dummy-posts");

const getPostsByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const posts = DUMMY_POSTS.filter((p) => {
    return userId === p.creator;
  });

  if (!posts || posts.length === 0)
    return next(new HttpError("Post with this userId does not exist!", 404));

  res.json({ posts });
};

const getPostByPostId = (req, res, next) => {
  const postId = req.params.pid;

  const post = DUMMY_POSTS.find((p) => {
    return postId === p.id;
  });

  if (!post)
    return next(new HttpError("Post with this postId does not exist!", 404));

  res.json({ post });
};

const createPost = (req, res, next) => {
  if (!validationResult(req).isEmpty())
    return next(new HttpError("Invalid data sent. Please try again", 422));

  const { title, description, creator } = req.body;

  const createdPost = {
    id: uuid.v4(),
    title,
    description,
    creator,
  };

  DUMMY_POSTS.push(createdPost);
  res.status(201).json({ post: createdPost });
};

const updatePost = (req, res, next) => {
  if (!validationResult(req).isEmpty())
    return next(new HttpError("Invalid data sent. Please try again", 422));

  const postId = req.params.pid;
  const { title, description } = req.body;

  const updatedPost = { ...DUMMY_POSTS.find((p) => p.id === postId) };
  const postIndex = DUMMY_POSTS.findIndex((p) => p.id === postId);
  updatedPost.title = title;
  updatedPost.description = description;

  DUMMY_POSTS[postIndex] = updatedPost;

  res.json("Successfully patched");
};

const deletePost = (req, res, next) => {
  const postId = req.params.pid;

  const findPost = DUMMY_POSTS.find((post) => post.id === postId);
  if (!findPost) return next(new HttpError("Post does not exist", 422));

  DUMMY_POSTS = DUMMY_POSTS.filter((post) => {
    return post.id !== postId;
  });

  res.json("Deleted Successfully");
};

exports.getPostsByUserId = getPostsByUserId;
exports.getPostByPostsId = getPostByPostId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
