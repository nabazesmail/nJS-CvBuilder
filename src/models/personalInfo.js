// src/models/personalInfo.js
const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: "Email address must be valid",
    },
  },
  phoneNumber:Number,
  address:String,
});

module.exports = mongoose.model('PersonalInfo', personalInfoSchema);
