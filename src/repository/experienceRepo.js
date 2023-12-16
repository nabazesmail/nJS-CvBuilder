const Experience = require('../models/experience');

async function createExperience(data) {
  return Experience.create(data);
}

async function getExperiences() {
  return Experience.find();
}

async function getExperienceById(id) {
  return Experience.findById(id);
}

async function updateExperience(id, data) {
  return Experience.findByIdAndUpdate(id, data, { new: true });
}

async function deleteExperience(id) {
  return Experience.findByIdAndDelete(id);
}

module.exports = {
  createExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
