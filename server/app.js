const express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
require("dotenv/config");

var usersController = require("./controllers/users");
var petsController = require("./controllers/pets");
var profilesController = require("./controllers/profiles");
var eventsController = require("./controllers/events");
var postsController = require("./controllers/posts");
var discussionController = require("./controllers/discussions");

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
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("We are on posts"));
app.use("/users", usersController);
app.use("/pets", petsController);
app.use("/profiles", profilesController);
app.use("/events", eventsController);
app.use("/posts", postsController);
app.use("/discussions", discussionController);

app.listen(port);
