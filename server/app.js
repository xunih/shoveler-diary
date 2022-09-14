const express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
require("dotenv/config");
var camelsController = require("./controllers/camels");

// Variables
var mongoURI = process.env.MONGODB_URI;
var port = process.env.PORT;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
    console.error(err.stack);
    process.exit(1);
  }
  console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

const app = express();

app.get("/", (req, res) => res.send("We are on posts"));
app.use("/camels", camelsController);

app.listen(8080);
