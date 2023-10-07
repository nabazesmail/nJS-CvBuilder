// controller/userController.js
const express = require('express');
const router = express.Router();
const userService = require('../services/userServices');
const authenticate=require('../middleware/authenticate').authenticate;

//register user
router.post('/', async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const token = await userService.login(email, password);
    if (!token) {
      return res.sendStatus(401);
    }
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.sendStatus(500);
  }
});

//below this Route all routes are authenticated
router.use(authenticate);


//get all users
router.get('/', async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update user
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//delete user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
