const summaryRepo = require("../repository/summaryRepo");
const userService = require("./userServices"); // Import the user service

async function createSummary(userId, summaryData) {
  const userExists = await userService.getUserById(userId);
  if (!userExists) {
    throw new Error("User does not exist");
  }

  return summaryRepo.createSummary({ userId, summary: summaryData });
}

async function getAllSummaries() {
  return summaryRepo.getSummaries();
}

async function getSummaryById(id) {
  return summaryRepo.getSummaryById(id);
}

async function getSummariesByUserId(userId) {
  return summaryRepo.getSummariesByUserId(userId);
}

async function updateSummary(id, data) {
  return summaryRepo.updateSummary(id, data);
}

async function deleteSummary(id) {
  return summaryRepo.deleteSummary(id);
}

module.exports = {
  createSummary,
  getAllSummaries,
  getSummaryById,
  getSummariesByUserId,
  updateSummary,
  deleteSummary,

};
