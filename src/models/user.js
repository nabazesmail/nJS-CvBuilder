// src/models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: 'Email address must be valid',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 15,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.pre('findOneAndUpdate', async function (next) {
  if (!this._update.password) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this._update.password, 10);
    this._update.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
