const { Languages } = require('../config/db'); // Adjust the path as needed

async function createLanguage(data) {
  return Languages.create(data);
}

async function getLanguages() {
  return Languages.find();
}

async function getLanguagesByUserId(userId) {
  return Languages.find({ userId: userId });
}

async function getLanguageById(id) {
  return Languages.findById(id);
}

async function updateLanguage(id, data) {
  return Languages.findByIdAndUpdate(id, data, { new: true });
}

async function deleteLanguage(id) {
  return Languages.findByIdAndDelete(id);
}

module.exports = {
  createLanguage,
  getLanguages,
  getLanguagesByUserId,
  getLanguageById,
  updateLanguage,
  deleteLanguage,
};
