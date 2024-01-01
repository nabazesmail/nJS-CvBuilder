// repository/skillsRepo.js
const { Skills } = require('../config/db'); // Adjust the path as needed

async function createSkill(data) {
  return Skills.create(data);
}

async function getSkills() {
  return Skills.find();
}

async function getSkillsByUserId(userId) {
  return Skills.find({ userId: userId });
}

async function getSkillById(id) {
  return Skills.findById(id);
}

async function updateSkill(id, data) {
  return Skills.findByIdAndUpdate(id, data, { new: true });
}

async function deleteSkill(id) {
  return Skills.findByIdAndDelete(id);
}

module.exports = {
  createSkill,
  getSkills,
  getSkillsByUserId,
  getSkillById,
  updateSkill,
  deleteSkill,
};
