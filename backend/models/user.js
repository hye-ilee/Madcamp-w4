const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  studentid: { type: String, required: true },
  major: { type: String, required: true },
  resume: { type: String, required: true },
  interests: { type: [String], required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;