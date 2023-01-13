const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const postsRoutes = require("./routes/posts-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyparser.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE"
//   );
//   next();
// });

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

mongoose
  .connect(
    "mongodb+srv://romi:ZCnJMTGGnhOTYiYl@cluster0.wgj1s.mongodb.net/posts?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
