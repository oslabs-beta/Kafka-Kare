const express = require("express");
const router = express.Router();
const clusterController = require("../controllers/clusterController");
const tokenController = require("../controllers/tokenController");

// Route for getting all of a user's clusters
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

// Route for editing a cluster
router.patch(
  '/:clusterId',
  tokenController.verifyToken,
  clusterController.updateCluster,
  (req, res) => {
    return res.status(200).json({ message: 'Cluster updated successfully' }); 
  }
)

// Route for changing favorite status of a cluster
router.patch(
  '/favorites/:clusterId',
  tokenController.verifyToken,
  clusterController.changeFavorite,
  (req, res) => {
    return res.status(200).json({ message: 'Cluster favorites updated successfully' });
  }
)

// Route for getting favorite clusters
router.get(
  '/favorites',
  tokenController.verifyToken,
  clusterController.getFavorites,
  (req, res) => {
    return res.status(200).json(res.locals.favoriteClusters);
  }
)

// Route for getting not-favorite clusters
router.get(
  '/notFavorites',
  tokenController.verifyToken,
  clusterController.getNotFavorites,
  (req, res) => {
    return res.status(200).json(res.locals.notFavoriteClusters);
  }
)
module.exports = router;
