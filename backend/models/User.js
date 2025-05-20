const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  gender: String,
  age: Number,
});

module.exports = mongoose.model("User", userSchema);
