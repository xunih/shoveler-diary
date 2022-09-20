var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var discussionSchema = new Schema({
  title: String,
  description: String,
  postDate: { type: Date, default: Date.now, required: true },
  comment: [{ body: String, date: Date }],
});

module.exports = mongoose.model("discussions", discussionSchema);
