const express = require("express");
const axios = require("axios");
const router = express.Router();
const metricsController = require("../controllers/metricsController");
const tokenController = require("../controllers/tokenController");

// WORK-IN-PROGRESS // Currently, does not take clusterId or userId into account
// Route for getting metrics for a specific cluster 
// WORK-IN-PROGRESS // Currently, does not take clusterId or userId into account
// Route for getting metrics for a specific cluster 
router.get(
  "/:clusterId",
  tokenController.verifyToken,
  metricsController.getMetrics,
  metricsController.checkAndSendNotification,
  (req, res) => {
    console.log('Sending metrics back to client...');
    return res.status(200).json(res.locals.graphData);
  }
);

module.exports = router;

