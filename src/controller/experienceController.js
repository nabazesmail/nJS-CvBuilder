const express = require("express");
const router = express.Router();
const experienceServices = require("../services/experienceServices");
const userService=require('../services/userServices')
const authenticate=require('../middleware/authenticate').authenticate;


//below this Route all routes are authenticated
router.use(authenticate);

// Route to create a new experience
router.post("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user exists
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const newExperience = await experienceServices.createExperience({
      userId: userId,
      position: req.body.position,
      typeOfJob: req.body.typeOfJob,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      aboutJob: req.body.aboutJob,
    });
    res.json(newExperience);
  } catch (error) {
    if (error) {
      return res.status(400).json({ error: 'User does not exist' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Route to get all experiences
router.get("/", async (req, res) => {
  try {
    const experiences = await experienceServices.getExperiences();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a specific experience by ID
router.get("/:id", async (req, res) => {
  try {
    const experience = await experienceServices.getExperienceById(
      req.params.id
    );
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update an experience by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedExperience = await experienceServices.updateExperience(
      req.params.id,
      req.body
    );
    res.json(updatedExperience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete an experience by ID
router.delete("/:id", async (req, res) => {
  try {
    await experienceServices.deleteExperience(req.params.id);
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
