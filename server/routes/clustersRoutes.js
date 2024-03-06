const express = require("express");
const router = express.Router();
const clusterController = require("../controllers/clusterController");
const tokenController = require("../controllers/tokenController");

// Route for getting all clusters
router.get(
  '/',
  tokenController.verifyToken,
  clusterController.getClusters,
  (req, res) => {
    console.log("Sending clusters to client");
    return res.status(200).json(res.locals.clusters);
  }
);

// Route for adding a cluster
router.post(
  '/',
  tokenController.verifyToken,
  clusterController.addCluster,
  (req, res) => {
    return res.status(201).json(res.locals.newCluster);
  }
);

module.exports = router;
