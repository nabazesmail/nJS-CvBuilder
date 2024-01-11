// router/index.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const goalsController = require('../controller/goalsController');
const experienceController = require('../controller/experienceController');
const personalInfoController = require('../controller/personalInfoController'); // Import the new controller
const educationController = require('../controller/educationController');
const problemController= require('../controller/problemController');
const skillController=require('../controller/skillController');
const languageController = require('../controller/languageController');
const summaryController=require('../controller/summaryController');

const userServices=require('../services/userServices');

router.use('/users', userController);

// Add the Google Sign-In routes
router.get('/auth/google', userServices.authenticateGoogle());
router.get('/auth/google/callback', userServices.handleGoogleCallbackSuccess);

// Add the route for getting user by email
router.get('/users/email/:email', userController);

router.use('/personal-info', personalInfoController);
router.use('/goals', goalsController);
router.use('/experiences', experienceController);
router.use('/education',educationController);
router.use('/problem', problemController);
router.use('/skill', skillController);
router.use('/language', languageController);
router.use('/summary', summaryController);


module.exports = router;
