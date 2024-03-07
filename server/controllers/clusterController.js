const Cluster = require("../models/clusterModel.js");

const clusterController = {};

// Middleware function to handle viewing all clusters
clusterController.getClusters = async (req, res, next) => {
  // testing
  console.log("In clusterController.getClusters");

  // Destructure variables from prior middleware
  const userId = res.locals.userId;

  // Find clusters in database
  try {
    const clusters = await Cluster.find({ ownerId: userId });

    console.log("Clusters found in database: ", clusters);
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
  console.log("In clusterController.addCluster");

  // Destructure from req.body
  const { name, hostnameAndPort } = req.body;

  // Destructure owner from prior middleware
  const ownerId = res.locals.userId;

  // Add cluster to database
  try {
    const newCluster = await Cluster.create({ name, hostnameAndPort, ownerId });
    console.log("New cluster added: ", newCluster);

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

// Middleware function to handle deleting a cluster
clusterController.deleteCluster = async (req, res, next) => {
  // testing
  console.log("In clusterController.deleteCluster");

  // Destructure variables
  const clusterId = req.params.clusterId;

  // Destructure variables from prior middleware
  const userId = res.locals.userId;

  // Delete cluster from database
  try {
    const cluster = await Cluster.findOne({ _id: clusterId });
    if (!cluster) {
      return res.status(404).send("Cluster not found");
    }

    if (cluster.ownerId !== userId) {
      return res
        .status(403)
        .send("User is not authorized to delete this cluster");
    }

    // User is authorized, delete the cluster
    await Cluster.deleteOne({ _id: clusterId });
    console.log("Cluster deleted successfully");

    return next();
  } catch (err) {
    return next({
      log: `clusterController.deleteCluster: ERROR ${err}`,
      status: 400,
      message: { err: "Error occurred in clusterController.deleteCluster." },
    });
  }
};

// Middleware function to handle updating a cluster
clusterController.updateCluster = async (req, res, next) => {
  // testing
  console.log("In clusterController.updateCluster");

  // Destructure variables
  const clusterId = req.params.clusterId;
  const { name, hostnameAndPort } = req.body;

  // Destructure variables from prior middleware
  const userId = res.locals.userId;

  // Update cluster in database
  try {
    const cluster = await Cluster.findById(clusterId);

    if (!cluster) {
      return res.status(404).send('Cluster not found');
    }

    if (cluster.ownerId !== userId) {
      return res.status(403).send('User is not authorized to update this cluster');
    }

    // Update the cluster
    await Cluster.findByIdAndUpdate(clusterId, {
      name: name,
      hostnameAndPort: hostnameAndPort,
    })
    console.log('Cluster updated successfully');
    return next();
  } catch (err) {
    return next({
      log: `clusterController.updateCluster: ERROR ${err}`,
      status: 400,
      message: { err: "Error occurred in clusterController.updateCluster." },
    });
  }
};

// Export
module.exports = clusterController;
