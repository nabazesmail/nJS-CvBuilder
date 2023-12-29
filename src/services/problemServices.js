// services/problemsServices.js
const problemsRepo = require('../repository/problemRepo');
const userService = require('./userServices'); // Import the userService

async function createProblem(data) {
  // Check if the user exists
  const userExists = await userService.getUserById(data.userId);
  if (!userExists) {
    console.log('User does not exist');
    throw new Error('User does not exist');
  }

  return problemsRepo.createProblem(data);
}

async function getProblems() {
  return problemsRepo.getProblems();
}

async function getProblemById(id) {
  return problemsRepo.getProblemById(id);
}

async function updateProblem(id, data) {
  return problemsRepo.updateProblem(id, data);
}

async function deleteProblem(id) {
  return problemsRepo.deleteProblem(id);
}

module.exports = {
  createProblem,
  getProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
};
