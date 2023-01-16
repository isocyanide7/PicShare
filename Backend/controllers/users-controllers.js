const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Getting Users Failed.Please try again", 500);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const login = async (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    const error = new HttpError("Invalid data sent. Please try again", 422);
    return next(error);
  }

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging in failed. Please try again", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = next(
      new HttpError("Invalid credentials. Please try again", 401)
    );
    return error;
  }

  res.json({
    message: "logged in!",
    user: existingUser.toObject({ getters: true }),
  });
};

const signup = async (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    const error = new HttpError("Invalid data sent. Please try again", 422);
    return next(error);
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed. Please try again" + err,
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("This user already exists.Login Instead.", 422);
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    password,
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.charactour.com%2Fhub%2Fcharacters%2Fview%2FSpike-Spiegel.Cowboy-Bebop&psig=AOvVaw2YsXjcO1kXD1fP7j15OcId&ust=1672209870670000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCKCe6ayZmfwCFQAAAAAdAAAAABAE",
    posts: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed.Please try again." + err,
      500
    );
    return next(error);
  }

  res.json({ user: newUser.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
