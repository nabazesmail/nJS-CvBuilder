// src/models/problems.js
const mongoose = require('mongoose');

const problemsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  yourProblem: String,
});

module.exports = mongoose.model('problems', problemsSchema);
