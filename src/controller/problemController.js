// controller/problemsController.js
const express = require('express');
const router = express.Router();
const problemsService = require('../services/problemServices');
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

    const newProblem = await problemsService.createProblem({
      userId: userId,
      name: req.body.name,
      yourProblem: req.body.yourProblem,
    });

    res.json(newProblem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const problems = await problemsService.getProblems();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const problem = await problemsService.getProblemById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedProblem = await problemsService.updateProblem(req.params.id, req.body);
    res.json(updatedProblem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProblem = await problemsService.deleteProblem(req.params.id);
    res.json(deletedProblem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
