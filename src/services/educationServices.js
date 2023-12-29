const educationRepo = require('../repository/educationRepo');
const userService = require('./userServices'); // Import the userService

async function createEducation(data) {
  // Check if the user exists
  const userExists = await userService.getUserById(data.userId);
  if (!userExists) {
    console.log('User does not exist');
    throw new Error('User does not exist');
  }

  return educationRepo.createEducation(data);
}

async function getEducation() {
  return educationRepo.getEducation();
}

async function getEducationById(id) {
  return educationRepo.getEducationById(id);
}

async function updateEducation(id, data) {
  return educationRepo.updateEducation(id, data);
}

async function deleteEducation(id) {
  return educationRepo.deleteEducation(id);
}

module.exports = {
  createEducation,
  getEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
};
