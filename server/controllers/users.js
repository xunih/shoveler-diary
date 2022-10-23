var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Post = require("../models/post");
var Event = require("../models/event");
var Discussion = require("../models/discussion");
const jwt = require("jsonwebtoken");
var { authenticateJWT } = require("../authorizationVerification");
var { sendConfirmationEmail } = require("../nodemailer.config");

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
  const token = jwt.sign(
    { email: req.body.email, password: req.body.password },
    process.env.JWT_SECRET
  );
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    post: req.body.post,
    username: req.body.email,
    discussion: req.body.discussion,
    confirmationCode: token,
  });
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) throw err;
    if (user) {
      res.status(409).send({
        status: 409,
      });
    }
  });
  user.save(function (err) {
    if (err) {
      return next(err);
    }
    /*
    res.status(201).json({
      user,
    });*/
    res.status(201).send({
      message: "Please verify your email!",
    });

    sendConfirmationEmail(user.email, user.confirmationCode);
  });
});

router.get("/verify/:confirmationCode", function (req, res, next) {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          res.status(201).send({ message: "Account verified" });
        }
      });
    })
    .catch((e) => console.log("error", e));
});

router.post("/login", function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) throw err;
    if (user) {
      if (user.status != "Active") {
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      }
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          const accessToken = jwt.sign(
            { email: user.email, password: user.password },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
          );
          res.status(201).json({
            status: "success",
            accessToken,
            data: {
              user,
            },
          });
        } else {
          res.status(403).send("Password incorrect");
        }
      });
    }
  });
});

// Return the user with the given ID
router.get("/:id", authenticateJWT, function (req, res, next) {
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
    .populate("username")
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

router.post("/:id/posts", authenticateJWT, function (req, res, next) {
  console.log("insideh posts");
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

router.post("/:id/events", authenticateJWT, function (req, res, next) {
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

router.post("/:id/discussions", authenticateJWT, function (req, res, next) {
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

router.patch("/:id", authenticateJWT, function (req, res, next) {
  var id = req.params.id;
  User.findById(id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.username = req.body.username || user.username;
    user.save();
    res.status(201).json(user);
  });
});

module.exports = router;
