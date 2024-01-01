const express = require('express');
const router = express.Router();
const languageService = require('../services/languageServices');
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

    const newLanguage = await languageService.createLanguage({
      userId: userId,
      language: req.body.language,
    });

    res.json(newLanguage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const languages = await languageService.getLanguages();
    res.json(languages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const language = await languageService.getLanguageById(req.params.id);
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    res.json(language);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userLanguages = await languageService.getLanguagesByUserId(userId);
    res.json(userLanguages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedLanguage = await languageService.updateLanguage(req.params.id, req.body);
    res.json(updatedLanguage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedLanguage = await languageService.deleteLanguage(req.params.id);
    res.json(deletedLanguage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
