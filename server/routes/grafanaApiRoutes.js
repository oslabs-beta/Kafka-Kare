const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/tokenController");
const grafanaApiController = require("../controllers/grafanaApiController");

// Route for adding user data source to Grafana
router.post(
  "create-datasource",
  tokenController.verifyToken,
  grafanaApiController.addDatasource,
  (req, res) => {
    return res.status(200).json({});
  }
);

// Route for initializing user's dashboard to Grafana
router.post(
  "/create-dashboard",
  tokenController.verifyToken,
  grafanaApiController.addDashboard,
  (req, res) => {
    return res.status(200).json({});
  }
);

module.exports = router;
