var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var multer = require("multer");
var fs = require("fs");
var path = require("path");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

// Return a list of all posts
router.get("/", function (req, res, next) {
  Post.find(function (err, posts) {
    if (err) {
      return next(err);
    }
    res.render("imagesPage", { posts: posts });
  });
});

// Create a new post
router.post("/", upload.single("image"), function (req, res, next) {
  var post = {
    title: req.body.title,
    description: req.body.description,
    image: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  post.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(post);
  });
});

// Return the post with the given ID
router.get("/:id", function (req, res, next) {
  var id = req.params.id;
  Post.findById(id, function (err, post) {
    if (err) {
      return next(err);
    }
    if (post === null) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });
});

// Delete the post with the given ID
router.delete("/:id", function (req, res, next) {
  var id = req.params.id;
  Post.findOneAndDelete({ _id: id }, function (err, post) {
    if (err) {
      return next(err);
    }
    if (post === null) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });
});

router.put("/:id", function (req, res, next) {
  var id = req.params.id;
  Post.findByIdAndUpdate(
    id,
    req.body,
    { overwrite: true, new: true },
    function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "Post profile updated" });
    }
  );
});

module.exports = router;
