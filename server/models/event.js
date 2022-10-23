var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  location: { type: String },
  note: { type: String },
});

module.exports = mongoose.model("events", eventSchema);
