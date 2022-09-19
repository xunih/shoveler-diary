var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  location: { type: String },
  note: { type: String },
  pet: {
    type: Schema.Types.ObjectId,
    ref: "pets",
  },
});

module.exports = mongoose.model("events", eventSchema);
