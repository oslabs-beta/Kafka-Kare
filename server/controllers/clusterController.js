const Cluster = require("../models/clusterModel.js");

const clusterController = {};

// Middleware function to handle viewing all clusters
clusterController.getClusters = async (req, res, next) => {
  // testing
  console.log('clusterController.getClusters');
  console.log('req.body contains: ', req.body);

  // Destructure variables from req.body

  // Find clusters in database
  try {
    return next();
  } catch (err) {
    return next({
      log: `clusterController.getClusters: ERROR ${err}`,
      status: 400,
      message: { err: "Error occurred in clusterController.getClusters." },
    });
  }
};

// Middleware function to handle adding a cluster
clusterController.addCluster = async (req, res, next) => {
  // testing
  console.log('clusterController.addCluster');
  console.log('req.body contains: ', req.body);

  // Destructure from req.body

  // Add cluster to database
  try {
      return next();
    } catch (err) {
    return next({
      log: `clusterController.addCluster: ERROR ${err}`,
      status: 400,
      message: { err: "Error occurred in clusterController.addCluster." },
    });
  }
};

// Export
module.exports = {
  clusterController
};
