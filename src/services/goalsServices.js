// services/personalInfoServices.js
const goalsRepo = require('../repository/goalsRepo');

const userService = require('./userServices'); // Import the userService

async function createGoals(data) {
  // Check if the user exists
  const userExists = await userService.getUserById(data.userId);
  if (!userExists) {
    console.log('User does not exist');
    throw new Error('User does not exist');
  }

  // Check if a personal info record already exists for the user
  const existingGoal = await goalsRepo.getGoalsByUserId(data.userId);
  if (existingGoal) {
    console.log('Goal already exists for this user');
    throw new Error('Goal already exists for this user');
  }

  return goalsRepo.createGoals(data);
}

async function getGoals() {
  return goalsRepo.getGoals();
}

async function getGoalsById(id) {
  return goalsRepo.getGoalsById(id);
}

async function updateGoals(id, data) {
  return goalsRepo.updateGoals(id, data);
}

async function deleteGoals(id) {
  return goalsRepo.deleteGoals(id);
}

module.exports = {
    createGoals,
    getGoals,
    getGoalsById,
    updateGoals,
    deleteGoals,
};
