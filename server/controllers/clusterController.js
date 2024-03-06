const Cluster = require("../models/clusterModel.js");

const clusterController = {};

// Middleware function to handle viewing all clusters
clusterController.getClusters = async (req, res, next) => {
  // testing
  console.log('In clusterController.getClusters');

  // Destructure variables from prior middleware
  const userId = res.locals.userId;

  // Find clusters in database
  try {
    const clusters = await Cluster.find({ ownerId: userId });
    console.log('Clusters found in database: ', clusters); 
    res.locals.clusters = clusters;
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
  console.log('In clusterController.addCluster');

  // Destructure from req.body
  const { name, hostnameAndPort } = req.body;

  // Destructure owner from prior middleware
  const ownerId = res.locals.userId;

  // Add cluster to database
  try {
    const newCluster = await Cluster.create({ name, hostnameAndPort, ownerId });
    console.log('New cluster added: ', newCluster);
    res.locals.newCluster = newCluster;
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
module.exports = clusterController;
