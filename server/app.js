const express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var cors = require("cors");
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
app.use(bodyParser.json({ limit: "5mb" }));
app.use(morgan("dev"));
app.options("*", cors());
app.use(cors());

app.get("/api", (req, res) => res.send("We are on posts"));
app.use("/api/users", usersController);
app.use("/api/pets", petsController);
app.use("/api/profiles", profilesController);
app.use("/api/events", eventsController);
app.use("/api/posts", postsController);
app.use("/api/discussions", discussionController);

app.use("/api/*", function (req, res) {
  res.status(404).json({ message: "Not Found" });
});

app.listen(port);
