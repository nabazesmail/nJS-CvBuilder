const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

const User = require('../models/user');
const PersonalInfo = require('../models/personalInfo');
const Goals = require('../models/golas'); // Assuming the model for goals is named 'goals'
const Education = require('../models/education'); // Import the Education model
const Experience = require('../models/experience'); // Import the Experience model
const Problems = require('../models/problems');
const Skills=require('../models/skills'); // Import the Skills model

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
};

module.exports = {
  connectToDatabase,
  User,
  PersonalInfo,
  Goals,
  Education,
  Experience,
  Problems,
  Skills
};
