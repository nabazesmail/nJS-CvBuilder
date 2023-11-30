// repository/personalInfoRepo.js
const { Goals } = require('../config/db'); // Adjust the path as needed

async function createGoals(data) {
  return Goals.create(data);
}

async function getGoals() {
  return Goals.find();
}

async function getGoalsByUserId(userId) {
  return Goals.findOne({ userId: userId });
}

async function getGoalsById(id) {
  return Goals.findById(id);
}

async function updateGoals(id, data) {
  return Goals.findByIdAndUpdate(id, data, { new: true });
}

async function deleteGoals(id) {
  return Goals.findByIdAndDelete(id);
}

module.exports = {
    createGoals,
    getGoals,
    getGoalsByUserId,
    getGoalsById,
    updateGoals,
    deleteGoals,
};
