const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  position: String,
  typeOfJob: String,
  startDate: Date,
  endDate: Date,
  aboutJob: String,
  // Add other fields as needed
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
