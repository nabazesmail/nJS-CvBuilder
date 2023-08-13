// src/models/personalInfo.js
const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  firstName: String,
  lastName: String,
});

module.exports = mongoose.model('PersonalInfo', personalInfoSchema);
