const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  major: { type: String, enum: ['CS', 'ID'], required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  LabPI: { type: String, required: true },
  LabKeywords: { type: [String], required: true },
  LabLink: { type: String, required: true },
  //lab_data: { type: Object, required: true }
});

const Lab = mongoose.model('Lab', labSchema, function (doc) {
  return doc.major === 'CS' ? 'cslabs' : 'idlabs';
});

module.exports = Lab;