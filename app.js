/************** NPM MODULES  **************/
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

/************** ROUTE IMPORTS *************/
const feedRoutes = require("./routes/feed");

/************** EXPRESS SETUP ************/
const app = express();

/************** PARSER SETUP *************/
app.use(express.json());

/************* ROUTES SETUP **************/
app.use("/", feedRoutes);

/****** EROOR HANDLING MIDDLEWARE  *******/
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data,
  });
});

/******** 404 MIDDLEWARE *********/
app.use((req, res, next) => {
  res.status(404).json({
    message: "resourse not found",
  });
});

/*********** PORT AND DB SETUP **********/
const PORT = 8080;
mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started on port: " + PORT);
    });
  })
  .catch((err) => console.log(err));
