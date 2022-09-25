var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  postDate: { type: Date, default: Date.now },
  ifLiked: { type: Boolean },
});

module.exports = mongoose.model("posts", postSchema);
