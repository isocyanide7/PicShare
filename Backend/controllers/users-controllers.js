const uuid = require("uuid");
const {validationResult} =require("express-validator");

const DUMMY_USERS = require("../data/dummy-users");
const HttpError = require("../models/http-error");

const getUsers = (req, res, next) => {
  res.json(DUMMY_USERS);
};

const login = (req, res, next) => {
    if (!validationResult(req).isEmpty())
    return next(new HttpError("Invalid data sent. Please try again", 422));

  const { name, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((user) => user.name === name);

  if (!identifiedUser || identifiedUser.password !== password)
    return next(
      new HttpError(
        "Invalid Credentials. This user does not seem to exist",
        401
      )
    );

  res.json("Logged in!");
};

const signup = (req, res, next) => {
    if (!validationResult(req).isEmpty())
    return next(new HttpError("Invalid data sent. Please try again", 422));

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);
  if (hasUser) return next(new HttpError("This user already exists", 422));

  const newUser = {
    id: uuid.v4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(newUser);

  res.json("Signup is successful");
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
