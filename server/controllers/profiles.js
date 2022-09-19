var express = require("express");
var router = express.Router();
var Profile = require("../models/profile");

// Return a list of all profiles
router.get("/", function (req, res, next) {
  Profile.find(function (err, profiles) {
    if (err) {
      return next(err);
    }
    res.json({
      profiles: profiles,
    });
  });
});

// Create a new profile (user registration function)
router.post("/", function (req, res, next) {
  var profile = new Profile(req.body);
  profile.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(profile);
  });
});

// Return the profile with the given ID
router.get("/:id", function (req, res, next) {
  var id = req.params.id;
  Profile.findById(id, function (err, profile) {
    if (err) {
      return next(err);
    }
    if (profile === null) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }
    res.json(profile);
  });
});

// Partially update the profile with the given ID
// User can update their profile picture, bio and location on their profile page
router.patch("/:id", function (req, res, next) {
  var id = req.params.id;
  Profile.findById(id, function (err, profile) {
    if (err) {
      return next(err);
    }
    if (profile === null) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }
    profile.username = req.body.username || profile.username;
    profile.profilePicture = req.body.profilePicture || profile.profilePicture;
    profile.save();
    res.json(profile);
  });
});

router.put("/:id", function (req, res, next) {
  var id = req.params.id;
  Profile.findByIdAndUpdate(
    id,
    req.body,
    { overwrite: true, new: true },
    function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "Profile updated" });
    }
  );
});
module.exports = router;

// Delete the profile with the given ID
router.delete("/:id", function (req, res, next) {
  var id = req.params.id;
  Profile.findOneAndDelete({ _id: id }, function (err, profile) {
    if (err) {
      return next(err);
    }
    if (profile === null) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  });
});

// Delete all profiles from the collection
router.delete("/", function (req, res, next) {
  Profile.deleteMany(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: "All profiles deleted" });
  });
});

module.exports = router;
