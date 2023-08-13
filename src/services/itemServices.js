// services/itemService.js
const repository = require('../repository/repository');

async function createItem(data) {
  return repository.createItem(data);
}

async function getItems() {
  return repository.getItems();
}

async function getItemById(id) {
  return repository.getItemById(id);
}

async function updateItem(id, data) {
  return repository.updateItem(id, data);
}

async function deleteItem(id) {
  return repository.deleteItem(id);
}

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
