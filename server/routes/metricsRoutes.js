const express = require("express");
const axios = require("axios");
const router = express.Router();
const metricsController = require("../controllers/metricsController");
const tokenController = require("../controllers/tokenController");

router.get(
  "/:clusterId",
  tokenController.verifyToken,
  metricsController.getMetrics,
  (req, res) => {
    return res.status(200).json(res.locals.data);
  }
);

module.exports = router;
