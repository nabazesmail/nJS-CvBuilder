const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  university: String,
  department: String,
  startDate: Date,
  finishDate: Date,
  // Add other fields as needed
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
