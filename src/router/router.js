// router/index.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const goalsController = require('../controller/goalsController');
const experienceController = require('../controller/experienceController');
const personalInfoController = require('../controller/personalInfoController'); // Import the new controller
const userServices=require('../services/userServices');

router.use('/users', userController);

// Add the Google Sign-In routes
router.get('/auth/google', userServices.authenticateGoogle());
router.get('/auth/google/callback', userServices.handleGoogleCallbackSuccess);

// Add the route for getting user by email
router.get('/users/email/:email', userController);

router.use('/personal-info', personalInfoController); // Use the new controller for personal info
router.use('/goals', goalsController); // Use the new controller for personal info
router.use('/experiences', experienceController);


module.exports = router;
