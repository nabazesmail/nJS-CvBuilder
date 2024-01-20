// uploadController.js
const storage = require("../config/appwriteConfig");
const { InputFile } = require('node-appwrite'); // Import InputFile

const handleUpload = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    const inputFile = InputFile.fromBuffer(file.buffer, file.originalname); // Create an InputFile from the buffer

    const bucketId = '65ac3a1a3f9cea5c40e5'; // Replace with your actual bucket ID

    // Upload file to Appwrite Storage
    let result = await storage.createFile(
      bucketId, // Specify the bucket ID
      'unique()', // File ID
      inputFile, // Use the InputFile instance here
      [], // Read permissions
      [], // Write permissions
      file.originalname // File name
    );

    res.status(200).send({ message: "File uploaded successfully", data: result });
  } catch (error) {
    res.status(500).send({ message: "Pendding" });
  }
};

module.exports = handleUpload;
