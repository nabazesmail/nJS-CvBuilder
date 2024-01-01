// src/models/skills.js
const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  skill: String,
});

module.exports = mongoose.model('skills', skillsSchema);
