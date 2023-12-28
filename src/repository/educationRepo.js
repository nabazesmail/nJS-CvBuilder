const { Education } = require('../config/db'); // Adjust the path as needed

async function createEducation(data) {
  return Education.create(data);
}

async function getEducation() {
  return Education.find();
}

async function getEducationByUserId(userId) {
  return Education.findOne({ userId: userId });
}

async function getEducationById(id) {
  return Education.findById(id);
}

async function updateEducation(id, data) {
  return Education.findByIdAndUpdate(id, data, { new: true });
}

async function deleteEducation(id) {
  return Education.findByIdAndDelete(id);
}

module.exports = {
  createEducation,
  getEducation,
  getEducationByUserId,
  getEducationById,
  updateEducation,
  deleteEducation,
};
