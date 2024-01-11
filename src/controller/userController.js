const express = require("express");
const router = express.Router();
const userService = require("../services/userServices");
const { authenticate } = require("../middleware/authenticate");

const sendEmail = require("../middleware/nodeMailer");

const { sendResetPasswordEmail } = require("../middleware/nodeMailer");
const { generateResetToken } = require("../utils/tokenServices");
const { User } = require("../config/db");

// Register user
router.post("/", async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login user and generate token
router.post("/login", async (req, res) => {
  try {
    const { user, token } = await userService.login(req.body);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/forgetpassword", async (req, res) => {
  try {
    const { email } = req.body; // Extract 'email' from request body

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Generate a random password reset token (You should use a secure method for this)
    const resetToken = generateResetToken(); // Implement a function to generate a token

    // Compose email data
    const emailOptions = {
      email: user.email, // Assuming 'user' has an 'email' field
      subject: "Password Reset",
      message: `Your password reset token is: ${resetToken}
      open this link to change your password http://localhost:3000/resetpassword then verify your email by adding the reset token`,
    };

    // Send email with password reset token
    await sendEmail(emailOptions);

    res.status(200).json("Check your email to reset your password!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Authentication middleware
router.use(authenticate);

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by email
router.get("/email/:email", async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
