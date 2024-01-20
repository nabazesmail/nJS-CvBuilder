// multerConfig.js
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: Infinity }, // No file size limit
});

module.exports = upload;
