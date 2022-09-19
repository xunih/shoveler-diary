var express = require("express");
var router = express.Router();
var Pet = require("../models/pet");

// Return a list of all pets
router.get("/", function (req, res, next) {
  Pet.find(function (err, pets) {
    if (err) {
      return next(err);
    }
    res.json({ pets: pets });
  });
});

// Create a new pet
router.post("/", function (req, res, next) {
  console.log(req.body);
  var pet = new Pet(req.body);
  pet.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(pet);
  });
});

// Return the pet with the given ID
router.get("/:id", function (req, res, next) {
  var id = req.params.id;
  Pet.findById(id, function (err, pet) {
    if (err) {
      return next(err);
    }
    if (pet === null) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  });
});

// Delete the pet with the given ID
router.delete("/:id", function (req, res, next) {
  var id = req.params.id;
  Pet.findOneAndDelete({ _id: id }, function (err, pet) {
    if (err) {
      return next(err);
    }
    if (pet === null) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  });
});

// Partially update the profile with the given ID
router.patch("/:id", function (req, res, next) {
  var id = req.params.id;
  Pet.findById(id, function (err, pet) {
    if (err) {
      return next(err);
    }
    if (pet === null) {
      return res.status(404).json({
        message: "Pet profile not found",
      });
    }
    pet.name = req.body.name || pet.name;
    pet.birth = req.body.birth || pet.birth;
    pet.profilePicture = req.body.profilePicture || pet.profilePicture;
    pet.save();
    res.json(pet);
  });
});

router.put("/:id", function (req, res, next) {
  var id = req.params.id;
  Pet.findByIdAndUpdate(
    id,
    req.body,
    { overwrite: true, new: true },
    function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "Pet profile updated" });
    }
  );
});

module.exports = router;
