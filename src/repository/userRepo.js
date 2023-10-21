// repository/userRepo.js
const { User } = require('../config/db');

async function createUser(data) {
  return User.create(data);
}

async function getUserByEmail(email) {
  return User.findOne({ email: email });
}


async function getUsers() {
  return User.find();
}

async function getUserById(id) {
  return User.findById(id);
}

async function updateUser(id, data) {
  return User.findByIdAndUpdate(id, data, { new: true });
}

async function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

module.exports = {
  createUser,
  getUserByEmail,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
