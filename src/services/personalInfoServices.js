// services/personalInfoServices.js
const personalInfoRepo = require('../repository/personalInfoRepo');

const userService = require('./userServices'); // Import the userService

async function createPersonalInfo(data) {
  // Check if the user exists
  const userExists = await userService.getUserById(data.userId);
  if (!userExists) {
    throw new Error('User does not exist');
  }

  // Check if a personal info record already exists for the user
  const existingPersonalInfo = await personalInfoRepo.getPersonalInfoByUserId(data.userId);
  if (existingPersonalInfo) {
    throw new Error('Personal info already exists for this user');
  }

  return repository.createPersonalInfo(data);
}

async function getPersonalInfos() {
  return personalInfoRepo.getPersonalInfos();
}

async function getPersonalInfoById(id) {
  return personalInfoRepo.getPersonalInfoById(id);
}

async function updatePersonalInfo(id, data) {
  return personalInfoRepo.updatePersonalInfo(id, data);
}

async function deletePersonalInfo(id) {
  return personalInfoRepo.deletePersonalInfo(id);
}

module.exports = {
  createPersonalInfo,
  getPersonalInfos,
  getPersonalInfoById,
  updatePersonalInfo,
  deletePersonalInfo,
};
