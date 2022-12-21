const express = require("express");
const bodyParser = require("body-parser");

const DUMMY_PLACES = require("../data/dummy-places");

const Router = express.Router();

Router.get("/users/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const post = DUMMY_PLACES.find((p) => {
    return userId === p.creator;
  });
  res.json({ post });
});

Router.get("/:pid", (req, res, next) => {
  const postId = req.params.pid;
  const post = DUMMY_PLACES.find((p) => {
    return postId === p.id;
  });
  res.json({ post });
});

module.exports = Router;
