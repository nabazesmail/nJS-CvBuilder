// src/models/summary.js
const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  summary: String,
});

module.exports = mongoose.model("Summary", summarySchema);