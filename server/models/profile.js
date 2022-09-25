var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var profileSchema = new Schema({
  username: { type: String, required: true },
  // url of profile image
  profilePicture: { type: String },
});

module.exports = mongoose.model("profiles", profileSchema);