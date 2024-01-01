// controller/skillsController.js
const express = require('express');
const router = express.Router();
const skillsService = require('../services/skillsServices');
const userService = require('../services/userServices');
const authenticate = require('../middleware/authenticate').authenticate;

// Below this Route, all routes are authenticated
router.use(authenticate);

router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user exists
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const newSkill = await skillsService.createSkill({
      userId: userId,
      skill: req.body.skill,
    });

    res.json(newSkill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const skills = await skillsService.getSkills();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const skill = await skillsService.getSkillById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userSkills = await skillsService.getSkillsByUserId(userId);
    res.json(userSkills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedSkill = await skillsService.updateSkill(req.params.id, req.body);
    res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedSkill = await skillsService.deleteSkill(req.params.id);
    res.json(deletedSkill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
