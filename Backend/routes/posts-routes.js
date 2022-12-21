const express = require("express");
const { check } = require("express-validator");

const postController = require("../controllers/posts-controllers");

const Router = express.Router();

Router.get("/users/:uid", postController.getPostsByUserId);

Router.get("/:pid", postController.getPostByPostsId);

Router.post(
  "/",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  postController.createPost
);

Router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  postController.updatePost
);

Router.delete("/:pid", postController.deletePost);

module.exports = Router;
