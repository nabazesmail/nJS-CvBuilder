// repository/summaryRepo.js
const { Summary } = require('../config/db'); // Adjust the path as needed

async function createSummary(data) {
  return Summary.create(data);
}

async function getSummaries() {
  return Summary.find();
}

async function getSummaryById(id) {
  return Summary.findById(id);
}

async function getSummariesByUserId(userId) {
  return Summary.find({ userId: userId });
}


async function updateSummary(id, data) {
  return Summary.findByIdAndUpdate(id, data, { new: true });
}

async function deleteSummary(id) {
  return Summary.findByIdAndDelete(id);
}

module.exports = {
  createSummary,
  getSummaries,
  getSummaryById,
  getSummariesByUserId,
  updateSummary,
  deleteSummary,
};
