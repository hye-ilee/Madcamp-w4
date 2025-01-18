const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  major: { type: String, enum: ['CS', 'ID'], required: true },
  name: { type: String, required: true },
  lab_data: { type: Object, required: true }
});

const Lab = mongoose.model('Lab', labSchema, function (doc) {
  return doc.department === 'CS' ? 'cslabs' : 'idlabs';
});

module.exports = Lab;