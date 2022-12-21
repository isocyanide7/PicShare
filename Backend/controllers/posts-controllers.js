const uuid=require("uuid");

const HttpError = require("../models/http-error");
const DUMMY_PLACES = require("../data/dummy-places");

const getPostsByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const post = DUMMY_PLACES.find((p) => {
    return userId === p.creator;
  });

  if (!post)
    return next(new HttpError("Post with this userId does not exist!", 404));

  res.json({ post });
};

const getPostByPostId = (req, res, next) => {
  const postId = req.params.pid;

  const post = DUMMY_PLACES.find((p) => {
    return postId === p.id;
  });

  if (!post)
    return next(new HttpError("Post with this postId does not exist!", 404));

  res.json({ post });
};

const createPost = (req, res, next) => {
  const { title, description, creator } = req.body;

  const createdPost = {
    id: uuid.v4(),
    title,
    description,
    creator,
  };

  DUMMY_PLACES.push(createdPost);
  console.log(createdPost)
  res.status(201).json({ post: createdPost });
};

exports.getPostsByUserId = getPostsByUserId;
exports.getPostByPostsId = getPostByPostId;
exports.createPost = createPost;
