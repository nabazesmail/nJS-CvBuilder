const experienceRepo = require("../repository/experienceRepo");
const userService= require("../services/userServices");

async function createExperience(data) {
  // Check if the user exists
  const userExists = await userService.getUserById(data.userId);
  if (!userExists) {
    throw new Error('User does not exist');
  }

  // Proceed to create experience
  return Experience.create(data);
}


async function getExperiences() {
  return experienceRepo.getExperiences();
}

async function getExperienceById(id) {
  return experienceRepo.getExperienceById(id);
}

async function updateExperience(id, data) {
  // Check if the user exists
  const userExists = await userService.getUserById(data.userId);
  if (!userExists) {
    throw new Error('User does not exist');
  }

  // Proceed to update experience
  return Experience.findByIdAndUpdate(id, data, { new: true });
}

async function deleteExperience(id) {
  return experienceRepo.deleteExperience(id);
}

module.exports = {
  createExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
