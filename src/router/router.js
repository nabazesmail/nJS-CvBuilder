// router/index.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const personalInfoController = require('../controller/personalInfoController'); // Import the new controller

router.use('/users', userController);
router.use('/personal-info', personalInfoController); // Use the new controller for personal info

module.exports = router;
