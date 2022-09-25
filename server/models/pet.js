var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var petSchema = new Schema({
  name: { type: String, required: true },
  birth: { type: Date, default: Date.now, required: true },
  profilePicture: { type: String },
});

module.exports = mongoose.model("pets", petSchema);
