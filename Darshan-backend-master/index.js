require("dotenv").config({ debug: process.env.DEBUG });

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const routes = require("./routes/routes.js");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/pangramDb")
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("ERROR IN DB CONNECTION");
  });

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());



//My Routes
app.use("/", routes);
//Port
app.listen(process.env.PORT || 8000, () => {
  console.log(`App is running on ${process.env.PORT || 8000}`);
});
