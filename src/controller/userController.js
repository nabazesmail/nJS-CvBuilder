const express = require('express');
const router = express.Router();
const userService = require('../services/userServices');
const { authenticate } = require('../middleware/authenticate');

// Register user
router.post('/', async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    if (!token) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Authentication middleware
router.use(authenticate);

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by email
router.get('/email/:email', async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
