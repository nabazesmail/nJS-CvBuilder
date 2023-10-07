// services/userServices.js
const repository = require('../repository/userRepo');
const { generateToken }=require('../utils/tokenUtils')
const bcrypt = require('bcrypt');


async function createUser(data) {
  return repository.createUser(data);
}

async function login(email, password) {
  try {
    const user = await repository.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return token;
  } catch (error) {
    console.error('Failed to login:', error);
    throw new Error('Failed to login');
  }
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

async function deleteUser(id) {
  return repository.deleteUser(id);
}

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
