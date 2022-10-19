var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Profile = require("../models/profile");
var Post = require("../models/post");
var Event = require("../models/event");
var Discussion = require("../models/discussion");

// Return a list of all users
router.get("/", function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      return next(err);
    }
    res.json({ users: users });
  });
});

// Create a new user
router.post("/signup", function (req, res, next) {
  console.log(req.body);
  var user = new User(req.body);
  user.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(user);
  });
});

router.post("/login", function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) throw err;
    if (user) {
      console.log("inside compare");
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) throw err;
        console.log("The entered password is :", isMatch);
        if (isMatch) {
          res.status(201).json(user);
        } else {
          res.status(403).send("Password incorrect");
        }
      });
    }
  });
});

// Return the user with the given ID
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
  })
    .clone()
    .populate("pet")
    .populate("profile")
    .populate("event")
    .populate("post")
    .populate("discussion")
    .then((p) => console.log(p))
    .catch((error) => console.log(error));
});

// Delete the user with the given ID
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

router.post("/:id/profiles", function (req, res, next) {
  var profile = new Profile(req.body);
  var id = req.params.id;
  profile.save(
    function (err) {
      if (err) {
        return next(err);
      }
    },
    User.findById(id, function (err, user) {
      if (err) {
        return next(err);
      }
      if (user === null) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      user.profile = profile;
      console.log(user.profile);
      user.save();
      res.status(201).json(user);
    })
  );
});

router.post("/:id/posts", function (req, res, next) {
  var post = new Post(req.body);
  var id = req.params.id;
  post.save(
    function (err) {
      if (err) {
        return next(err);
      }
    },
    User.findById(id, function (err, user) {
      if (err) {
        return next(err);
      }
      if (user === null) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      user.post.push(post);
      user.save();
      res.status(201).json(user);
    })
  );
});

router.post("/:id/events", function (req, res, next) {
  var event = new Event(req.body);
  var id = req.params.id;
  event.save(
    function (err) {
      if (err) {
        return next(err);
      }
    },
    User.findById(id, function (err, user) {
      if (err) {
        return next(err);
      }
      if (user === null) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      user.event.push(event);
      console.log(user.event);
      user.save();
      res.status(201).json(user);
    })
  );
});

router.post("/:id/discussions", function (req, res, next) {
  var discussion = new Discussion(req.body);
  var id = req.params.id;
  discussion.save(
    function (err) {
      if (err) {
        return next(err);
      }
    },
    User.findById(id, function (err, user) {
      if (err) {
        return next(err);
      }
      if (user === null) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      user.discussion.push(discussion);
      console.log(user.discussion);
      user.save();
      res.status(201).json(user);
    })
  );
});
module.exports = router;
