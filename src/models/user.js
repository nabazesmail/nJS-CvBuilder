// src/models/user.js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  // No need to include ID field here
  email: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);


