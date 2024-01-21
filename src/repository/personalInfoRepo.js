// repository/personalInfoRepo.js
const { PersonalInfo } = require('../config/db'); // Adjust the path as needed

async function createPersonalInfo(data) {
  return PersonalInfo.create(data);
}

async function getPersonalInfos() {
  return PersonalInfo.find();
}

async function getPersonalInfoByUserId(userId) {
  return PersonalInfo.findOne({ userId: userId });
}

async function getPersonalInfoById(id) {
  return PersonalInfo.findById(id);
}

async function updatePersonalInfo(userId, data) {
  return PersonalInfo.findOneAndUpdate({ userId: userId }, data, { new: true });
}

async function deletePersonalInfo(id) {
  return PersonalInfo.findByIdAndDelete(id);
}

module.exports = {
  createPersonalInfo,
  getPersonalInfos,
  getPersonalInfoByUserId,
  getPersonalInfoById,
  updatePersonalInfo,
  deletePersonalInfo,
};
