// services/userServices.js

const repository = require("../repository/userRepo");
const { generateToken } = require("../utils/tokenUtils");
const bcrypt = require("bcrypt");
const passport = require("passport"); // Make sure to import the passport package correctly

function authenticateGoogle() {
  return passport.authenticate("google", { scope: ["profile", "email"] });
}

function handleGoogleCallback() {
  return passport.authenticate("google", { failureRedirect: "/" });
}

function handleGoogleCallbackSuccess(req, res) {
  res.redirect("/dashboard"); // Redirect after successful authentication
}

async function createUser(data) {
  return repository.createUser(data);
}


async function login(credentials) {
  const { email, password } = credentials;
  const user = await repository.getUserByEmail(email);

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  console.log('Is Password Valid:', isPasswordValid); // Add this line for debugging

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user); // Generate token for the user
  return { user, token };
}




async function getUsers() {
  return repository.getUsers();
}

async function getUserById(id) {
  return repository.getUserById(id);
}

async function updateUser(id, data) {
  return repository.updateUser(id, data);
}

async function getUserByEmail(email) {
  return repository.getUserByEmail(email);
}

async function deleteUser(id) {
  return repository.deleteUser(id);
}

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,

  authenticateGoogle,
  handleGoogleCallback,
  handleGoogleCallbackSuccess,
};
