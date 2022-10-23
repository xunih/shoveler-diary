var express = require("express");
var router = express.Router();
var Discussion = require("../models/discussion");
var { authenticateJWT } = require("../authorizationVerification");

// Return a list of all discussions
router.get("/", function (req, res, next) {
  Discussion.find(function (err, discussions) {
    if (err) {
      return next(err);
    }
    res.json({ discussions: discussions });
  });
});

// Create a new discussion
router.post("/", function (req, res, next) {
  console.log(req.body);
  var discussion = new Discussion(req.body);
  discussion.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(discussion);
  });
});

// Return the discussion with the given ID
router.get("/:id", function (req, res, next) {
  var id = req.params.id;
  Discussion.findById(id, function (err, discussion) {
    if (err) {
      return next(err);
    }
    if (discussion === null) {
      return res.status(404).json({ message: "Discussion not found" });
    }
    res.json(discussion);
  });
});

// Delete the discussion with the given ID
router.delete("/:id", function (req, res, next) {
  var id = req.params.id;
  Discussion.findOneAndDelete({ _id: id }, function (err, discussion) {
    if (err) {
      return next(err);
    }
    if (discussion === null) {
      return res.status(404).json({ message: "Discussion not found" });
    }
    res.json(discussion);
  });
});

router.put("/:id", function (req, res, next) {
  var id = req.params.id;
  Discussion.findByIdAndUpdate(
    id,
    req.body,
    { overwrite: true, new: true },
    function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "Dicussion board updated" });
    }
  );
});

router.patch("/:id", authenticateJWT, function (req, res, next) {
  var id = req.params.id;
  Discussion.findById(id, function (err, discussion) {
    if (err) {
      return next(err);
    }
    if (discussion === null) {
      return res.status(404).json({
        message: "Discussion topic not found",
      });
    }
    discussion.comment.push(req.body);
    discussion.save();
    res.json(discussion);
  });
});

module.exports = router;
