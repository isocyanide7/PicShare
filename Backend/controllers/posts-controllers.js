const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Post = require("../models/post");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

const getPostsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let posts;
  try {
    posts = await Post.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching data. Please try again",
      500
    );
    return next(error);
  }

  if (!posts || posts.length === 0) {
    const error = new HttpError("Post with this userId does not exist!", 404);
    return next(error);
  }

  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

const getPostByPostId = async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching data. Please try again",
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Post with this postId does not exist!", 404);
    return next(error);
  }

  res.json({ post: post.toObject({ getters: true }) });
};

const createPost = async (req, res, next) => {
  if (!validationResult(req).isEmpty())
    return next(new HttpError("Invalid data sent. Please try again", 422));

  const { title, description, creator } = req.body;

  const createdPost = new Post({
    title,
    description,
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.charactour.com%2Fhub%2Fcharacters%2Fview%2FSpike-Spiegel.Cowboy-Bebop&psig=AOvVaw2YsXjcO1kXD1fP7j15OcId&ust=1672209870670000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCKCe6ayZmfwCFQAAAAAdAAAAABAE",
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Creating place failed.Please try again." + err,
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "User with this creator id does not exist.Please try again.",
      500
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPost.save({session:sess});
    user.posts.push(createdPost);
    await user.save({session:sess});
    await sess.commitTransaction(); 
  } catch (err) {
    const error = new HttpError(
      "Creating place failed.Please try again." + err,
      500
    );
    return next(error);
  }

  res.status(201).json({ post: createdPost });
};

const updatePost = async (req, res, next) => {
  if (!validationResult(req).isEmpty())
    return next(new HttpError("Invalid data sent. Please try again", 422));

  const postId = req.params.pid;
  const { title, description } = req.body;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching data. Please try again",
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Post with this postId does not exist!", 404);
    return next(error);
  }

  post.title = title;
  post.description = description;

  try {
    await post.save();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed.Please try again." + err,
      500
    );
    return next(error);
  }

  res.json({ post: post.toObject({ getters: true }) });
};

const deletePost = async (req, res, next) => {
  const postId = req.params.pid;

  let findPost;
  try {
    findPost = await Post.findById(postId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went horibbly wrong while deleting data. Please try again",
      500
    );
    return next(error);
  }

  if (!findPost) {
    const error = new HttpError("Post with this postId does not exist!", 404);
    return next(error);
  }

  try {
    const sess=await mongoose.startSession();
    sess.startTransaction();
    await findPost.remove({session:sess});
    findPost.creator.posts.pull(findPost);
    await findPost.creator.save({session:sess});
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while deleting data. Please try again",
      500
    );
    return next(error);
  }

  res.json("Deleted Successfully");
};

exports.getPostsByUserId = getPostsByUserId;
exports.getPostByPostsId = getPostByPostId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
