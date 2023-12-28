const express = require('express');
const router = express.Router();
const educationService = require('../services/educationServices');
const userService = require('../services/userServices');
const authenticate = require('../middleware/authenticate').authenticate;

// Below this Route all routes are authenticated
router.use(authenticate);

router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user exists
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const newEducation = await educationService.createEducation({
      userId: userId,
      university: req.body.university,
      department: req.body.department,
      startDate: req.body.startDate,
      finishDate: req.body.finishDate,
      // Add other fields as needed
    });

    res.json(newEducation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const educationList = await educationService.getEducation();
    res.json(educationList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const education = await educationService.getEducationById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedEducation = await educationService.updateEducation(req.params.id, req.body);
    res.json(updatedEducation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedEducation = await educationService.deleteEducation(req.params.id);
    res.json(deletedEducation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
