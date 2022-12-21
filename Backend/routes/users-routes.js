const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/users-controllers");

const Router = express.Router();

Router.get("/", userControllers.getUsers);

Router.post(
  "/login",
  [check("name").not().isEmpty(), check("password").isLength({ min: 8 })],
  userControllers.login
);

Router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  userControllers.signup
);

module.exports = Router;
