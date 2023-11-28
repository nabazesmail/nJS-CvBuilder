const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
      message: "Email address must be valid",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 15,
  },
  passwordConfirmation: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: "Passwords do not match",
    },
  },
});

// Hash the password and passwordConfirmation before saving to the database
userSchema.pre("save", async function (next) {
  try {
    // Check if the password field is modified or new
    if (this.isModified("password") || this.isNew) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }

    // Hash passwordConfirmation if it's present and modified
    if (this.isModified("passwordConfirmation")) {
      const hashedConfirmation = await bcrypt.hash(
        this.passwordConfirmation,
        10
      );
      this.passwordConfirmation = hashedConfirmation;
    }

    next();
  } catch (error) {
    return next(error);
  }
});

// Hash the password before findOneAndUpdate
userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this._update.password) {
      const hashedPassword = await bcrypt.hash(this._update.password, 10);
      this._update.password = hashedPassword;
    }
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
