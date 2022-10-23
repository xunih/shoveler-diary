var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var discussionSchema = new Schema({
  title: String,
  description: String,
  username: String,
  postDate: { type: Date, default: Date.now, required: true },
  comment: [
    {
      content: String,
      username: String,
      commentDate: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("discussions", discussionSchema);
