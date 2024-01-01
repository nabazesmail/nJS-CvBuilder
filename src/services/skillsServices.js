// services/skillsServices.js
const skillsRepo = require('../repository/skillsRepo');
const userService = require('./userServices'); // Import the userService

async function createSkill(data) {
  // Check if the user exists
  const userExists = await userService.getUserById(data.userId);
  if (!userExists) {
    console.log('User does not exist');
    throw new Error('User does not exist');
  }

  return skillsRepo.createSkill(data);
}

async function getSkills() {
  return skillsRepo.getSkills();
}

async function getSkillById(id) {
  return skillsRepo.getSkillById(id);
}

async function getSkillsByUserId(id) {
  // Check if the user exists
  const userExists = await userService.getUserById(id);
  if (!userExists) {
    throw new Error('User does not exist!!');
  }

  return skillsRepo.getSkillsByUserId(id);
}

async function updateSkill(id, data) {
  return skillsRepo.updateSkill(id, data);
}

async function deleteSkill(id) {
  return skillsRepo.deleteSkill(id);
}

module.exports = {
  createSkill,
  getSkills,
  getSkillById,
  getSkillsByUserId,
  updateSkill,
  deleteSkill,
};
