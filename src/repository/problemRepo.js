// repository/problemsRepo.js
const { Problems } = require('../config/db'); // Adjust the path as needed

async function createProblem(data) {
  return Problems.create(data);
}

async function getProblems() {
  return Problems.find();
}

async function getProblemByUserId(userId) {
  return Problems.findOne({ userId: userId });
}

async function getProblemById(id) {
  return Problems.findById(id);
}

async function updateProblem(id, data) {
  return Problems.findByIdAndUpdate(id, data, { new: true });
}

async function deleteProblem(id) {
  return Problems.findByIdAndDelete(id);
}

module.exports = {
  createProblem,
  getProblems,
  getProblemByUserId,
  getProblemById,
  updateProblem,
  deleteProblem,
};
