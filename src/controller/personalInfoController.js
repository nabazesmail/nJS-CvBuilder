// controller/personalInfoController.js
const express = require('express');
const router = express.Router();
const personalInfoService = require('../services/personalInfoServices');
const userService=require('../services/userServices')


router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user exists
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const newPersonalInfo = await personalInfoService.createPersonalInfo({
      userId: userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      // other personal info fields
    });

    res.json(newPersonalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const personalInfos = await personalInfoService.getPersonalInfos();
    res.json(personalInfos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const personalInfo = await personalInfoService.getPersonalInfoById(req.params.id);
    if (!personalInfo) {
      return res.status(404).json({ message: 'Personal info not found' });
    }
    res.json(personalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPersonalInfo = await personalInfoService.updatePersonalInfo(req.params.id, req.body);
    res.json(updatedPersonalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPersonalInfo = await personalInfoService.deletePersonalInfo(req.params.id);
    res.json(deletedPersonalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
