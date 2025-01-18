const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  studentid: { type: String, required: true },
  major: { type: String, required: true },
  resume: { type: String, required: true },
  interests: { type: [String], required: true }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;