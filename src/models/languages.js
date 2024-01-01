// languages.js
const mongoose = require('mongoose');

const languagesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  language: String,
});

module.exports = mongoose.model('languages', languagesSchema);
