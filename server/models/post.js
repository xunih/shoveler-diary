var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
  description: { type: String, required: true },
  image: { type: String },
  postDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("posts", postSchema);
