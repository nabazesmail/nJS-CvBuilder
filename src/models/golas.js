// src/models/goals.js
const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  occupation: String,
  yourOccupationGoal: String,
});

module.exports = mongoose.model('goals', goalsSchema);
