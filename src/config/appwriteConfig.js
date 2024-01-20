// appwriteConfig.js
const { Client, Storage } = require("node-appwrite");
require('dotenv').config();

// Initialize the Appwrite client
const client = new Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your Appwrite Endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
  .setKey(
    process.env.APPWRITE_API_KEY
  ); // Your secret API key

const storage = new Storage(client);

module.exports = storage;
