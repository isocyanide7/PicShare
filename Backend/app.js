const express = require("express");
const bodyparser = require("body-parser");

const postsRoutes = require("./routes/posts-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyparser.json());

app.use("/api/posts", postsRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  next(new HttpError("Could not find this route", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured" });
});

app.listen(5000);