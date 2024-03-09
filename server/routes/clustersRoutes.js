const express = require("express");
const router = express.Router();
const clusterController = require("../controllers/clusterController");
const tokenController = require("../controllers/tokenController");

// Route for getting all clusters
router.get(
  '/userClusters',
  tokenController.verifyToken,
  clusterController.getClusters,
  (req, res) => {
    console.log("Sending clusters to client");
    return res.status(200).json(res.locals.clusters);
  }
);

// Route for adding a cluster
router.post(
  '/addCluster',
  tokenController.verifyToken,
  clusterController.addCluster,
  (req, res) => {
    return res.status(201).json(res.locals.newCluster);
  }
);

// Route for deleting a cluster
router.delete(
  '/:clusterId',
  tokenController.verifyToken,
  clusterController.deleteCluster,
  (req, res) => {
    return res.status(200).json({ message: 'Cluster deleted successfully' });
  }
);

// Route for updating a cluster
router.patch(
  '/:clusterId',
  tokenController.verifyToken,
  clusterController.updateCluster,
  (req, res) => {
    return res.status(200).json({ message: 'Cluster updated successfully' }); 
  }
)

// Route for favoriting a cluster
router.patch(
  '/favorites/:clusterId',
  tokenController.verifyToken,
  clusterController.favoriteCluster,
  (req, res) => {
    return res.status(200).json({ message: 'Cluster favorites updated successfully' });
  }
)


module.exports = router;
