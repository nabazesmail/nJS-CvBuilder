// services/userServices.js
const repository = require('../repository/userRepo');


async function createUser(data) {
  return repository.createUser(data);
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
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
