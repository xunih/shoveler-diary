var express = require("express");
var router = express.Router();
var User = require("../models/user");

// Return a list of all camels
router.get("/", function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      return next(err);
    }
    res.json({ users: users });
  });
});

// Create a new camel
router.post("/", function (req, res, next) {
  console.log(req.body)
  var user = new User(req.body);
  user.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(user);
  });
});

// Return the camel with the given ID
router.get("/:id", function (req, res, next) {
  var id = req.params.id;
  User.findById(id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  });
});

// Delete the camel with the given ID
router.delete("/:id", function (req, res, next) {
  var id = req.params.id;
  User.findOneAndDelete({ _id: id }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  });
});

module.exports = router;
