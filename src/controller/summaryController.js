const express = require("express");
const router = express.Router();
const summaryService = require("../services/summaryServices");

router.post("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const summaryData = req.body.summary;
    const newSummary = await summaryService.createSummary(userId, summaryData);
    res.json(newSummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const summaries = await summaryService.getAllSummaries();
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const summaryId = req.params.id;
    const summary = await summaryService.getSummaryById(summaryId);
    if (!summary) {
      return res.status(404).json({ message: "Summary not found" });
    }
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userSummaries = await summaryService.getSummariesByUserId(userId);
    if (!userSummaries || userSummaries.length === 0) {
      return res.status(404).json({ message: "Summaries for this user not found" });
    }
    res.json(userSummaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const summaryId = req.params.id;
    const updatedSummary = await summaryService.updateSummary(summaryId, req.body);
    res.json(updatedSummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const summaryId = req.params.id;
    const deletedSummary = await summaryService.deleteSummary(summaryId);
    res.json(deletedSummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
