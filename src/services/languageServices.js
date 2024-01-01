const languageRepo = require('../repository/languageRepo');
const userService = require('./userServices');

async function createLanguage(data) {
  // Check for required fields in the data object
  if (!data.userId || !data.language || data.language.trim() === '') {
    throw new Error('User ID and Language can not be empty');
  }

  // Check if the user exists
  const userExists = await userService.getUserById(data.userId);
  if (!userExists) {
    console.log('User does not exist');
    throw new Error('User does not exist');
  }

  return languageRepo.createLanguage(data);
}

async function getLanguages() {
  return languageRepo.getLanguages();
}

async function getLanguageById(id) {
  return languageRepo.getLanguageById(id);
}

async function getLanguagesByUserId(id) {
  // Check if the user exists
  const userExists = await userService.getUserById(id);
  if (!userExists) {
    throw new Error('User does not exist');
  }

  return languageRepo.getLanguagesByUserId(id);
}

async function updateLanguage(id, data) {
  return languageRepo.updateLanguage(id, data);
}

async function deleteLanguage(id) {
  return languageRepo.deleteLanguage(id);
}

module.exports = {
  createLanguage,
  getLanguages,
  getLanguageById,
  getLanguagesByUserId,
  updateLanguage,
  deleteLanguage,
};
