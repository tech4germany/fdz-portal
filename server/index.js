"use strict";

require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const security = require("./middleware/security");
const routes = require("./routes");
const { ValError } = require("./utils/errors");
global.ValError = ValError;

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch((error) => {
    console.error("Error connecting to mongo", error);
  });

const app = express();

app.use(express.json());
app.use(security);
app.use(
  "/assets",
  express.static(path.join(__dirname, "../landing_page/assets"))
);

app.use(routes);
app.use((error, req, res, next) => {
  let message = error.message;
  if (!error.status) {
    message = "server";
    console.log(error);
  }
  res.json({ status: error.status ? error.status : 500, message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running: http://localhost:${process.env.PORT}`);
});
