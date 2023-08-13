// repository/repository.js
const Item = require('../models/Item');

async function createItem(data) {
  return Item.create(data);
}

async function getItems() {
  return Item.find();
}

async function getItemById(id) {
  return Item.findById(id);
}

async function updateItem(id, data) {
  return Item.findByIdAndUpdate(id, data, { new: true });
}

async function deleteItem(id) {
  return Item.findByIdAndDelete(id);
}

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
