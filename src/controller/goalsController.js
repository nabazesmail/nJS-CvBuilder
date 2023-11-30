// controller/personalInfoController.js
const express = require('express');
const router = express.Router();
const goalsService = require('../services/goalsServices');
const userService=require('../services/userServices')
const authenticate=require('../middleware/authenticate').authenticate;

//below this Route all routes are authenticated
router.use(authenticate);

router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user exists
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const newGoals = await goalsService.createGoals({
      userId: userId,
      occupation: req.body.occupation,
      yourOccupationGoal: req.body.yourOccupationGoal,
    });

    res.json(newGoals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const goals = await goalsService.getGoals();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const goals = await goalsService.getGoalsById(req.params.id);
    if (!goals) {
      return res.status(404).json({ message: 'goals not found' });
    }
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedGoal = await goalsService.updateGoals(req.params.id, req.body);
    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedGoal = await goalsService.deleteGoals(req.params.id);
    res.json(deletedGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
