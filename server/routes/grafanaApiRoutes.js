const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/tokenController");
const grafanaApiController = require("../controllers/grafanaApiController");

// Route for adding user data source then initializing user's dashboard to Grafana
router.post(
  '/create-datasource',
  tokenController.verifyToken,
  grafanaApiController.addDatasource,
  grafanaApiController.createDashboard,
  grafanaApiController.displayDashboard,
  (req, res) => {
    console.log('Sending Grafana dashboard iFrame back to client...');
    // return res.status(200).json({message: "Dashboard created from datasource successfully", data: res.locals.data});
    return res.status(200).json(res.locals.iFrame);
  }
);

module.exports = router;
