// router/index.js
const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');

router.use('/items', itemController);

module.exports = router;
