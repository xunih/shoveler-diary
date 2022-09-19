var express = require("express");
var router = express.Router();
var Event = require("../models/event");

// Return a list of all events
router.get("/", function (req, res, next) {
  Event.find(function (err, events) {
    if (err) {
      return next(err);
    }
    res.json({ events: events });
  });
});

// Create a new event
router.post("/", function (req, res, next) {
  console.log(req.body);
  var event = new Event(req.body);
  event.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(event);
  });
});

// Return the event with the given ID
router.get("/:id", function (req, res, next) {
  var id = req.params.id;
  Event.findById(id, function (err, event) {
    if (err) {
      return next(err);
    }
    if (event === null) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  })
    .populate("pet")
    .then((p) => console.log(p))
    .catch((error) => console.log(error));
});

// Delete the event with the given ID
router.delete("/:id", function (req, res, next) {
  var id = req.params.id;
  Event.findOneAndDelete({ _id: id }, function (err, event) {
    if (err) {
      return next(err);
    }
    if (event === null) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  });
});

// Partially update the event with the given ID
router.patch("/:id", function (req, res, next) {
  var id = req.params.id;
  Event.findById(id, function (err, event) {
    if (err) {
      return next(err);
    }
    if (event === null) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    event.title = req.body.title || event.title;
    event.date = req.body.date || event.date;
    event.location = req.body.location || event.location;
    Event.save();
    res.json(event);
  });
});

router.put("/:id", function (req, res, next) {
  var id = req.params.id;
  Event.findByIdAndUpdate(
    id,
    req.body,
    { overwrite: true, new: true },
    function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "Event updated" });
    }
  );
});

module.exports = router;
