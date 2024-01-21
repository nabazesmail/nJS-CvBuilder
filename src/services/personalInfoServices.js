// services/personalInfoServices.js
const personalInfoRepo = require('../repository/personalInfoRepo');

const userService = require('./userServices'); // Import the userService

async function createPersonalInfo(data) {
  // Check if the user exists
  const userExists = await userService.getUserById(data.userId);
  if (!userExists) {
    console.log('User does not exist');
    throw new Error('User does not exist');
  }

  // Check if a personal info record already exists for the user
  const existingPersonalInfo = await personalInfoRepo.getPersonalInfoByUserId(data.userId);
  if (existingPersonalInfo) {
    console.log('Personal info already exists for this user');
    throw new Error('Personal info already exists for this user');
  }

  return personalInfoRepo.createPersonalInfo(data);
}

async function getPersonalInfos() {
  return personalInfoRepo.getPersonalInfos();
}

async function getPersonalInfoById(id) {
  return personalInfoRepo.getPersonalInfoById(id);
}

async function getPersonalInfoByUserId(userId) {
  return personalInfoRepo.getPersonalInfoByUserId(userId);
}

async function updatePersonalInfo(userId, data) {
  // Make sure this correctly identifies and updates the document
  return personalInfoRepo.updatePersonalInfo(userId, data);
}

async function deletePersonalInfo(id) {
  return personalInfoRepo.deletePersonalInfo(id);
}

module.exports = {
  createPersonalInfo,
  getPersonalInfos,
  getPersonalInfoById,
  getPersonalInfoByUserId,
  updatePersonalInfo,
  deletePersonalInfo,
};
