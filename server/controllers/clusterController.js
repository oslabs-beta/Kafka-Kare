const Cluster = require("../models/clusterModel.js");

const clusterController = {};

// ---------------------------- GET CLUSTERS ---------------------------- //
clusterController.getClusters = async (req, res, next) => {
  console.log("In clusterController.getClusters"); // testing
  const userId = res.locals.userId; // Destructure from prior middleware

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


// ---------------------------- ADD CLUSTER ---------------------------- //
clusterController.addCluster = async (req, res, next) => {
  console.log("In clusterController.addCluster"); // testing
  console.log('req.body contains: ', req.body);
  const { name, hostnameAndPort } = req.body; // Destructure from req.body
  const ownerId = res.locals.userId; // Destructure from prior middleware

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


// ---------------------------- DELETE CLUSTER ---------------------------- //
clusterController.deleteCluster = async (req, res, next) => {
  console.log("In clusterController.deleteCluster"); // testing
  const clusterId = req.params.clusterId; // Destructure from req.params
  const userId = res.locals.userId; // Destructure from prior middleware

  // Delete cluster from database
  try {
    const cluster = await Cluster.findOne({ _id: clusterId });
    if (!cluster) {
      return res.status(404).send("Cluster not found");
    }

    // Check cluster owner
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


// ---------------------------- UPDATE CLUSTER ---------------------------- //
clusterController.updateCluster = async (req, res, next) => {
  console.log("In clusterController.updateCluster"); // testing
  console.log('req.body contains: ', req.body);

  const clusterId = req.params.clusterId; // // Destructure from req.params
  const { name, hostnameAndPort } = req.body; // Destructure from req.body middleware
  const { userId } = res.locals; // Destructure from prior middleware

  // Update cluster in database
  try {
    const cluster = await Cluster.findById(clusterId);
    if (!cluster) {
      return res.status(404).send('Cluster not found');
    }

    // Check cluster owner
    if (cluster.ownerId !== userId) {
      return res.status(403).send('User is not authorized to update this cluster');
    }

    // User is authorized, update the cluster
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


// ---------------------------- FAVORITE CLUSTER ---------------------------- //
clusterController.favoriteCluster = async (req, res, next) => {
  console.log("In clusterController.favoriteCluster"); // testing
  
  const clusterId = req.params.clusterId; // // Destructure from req.params
  const { userId } = res.locals; // Destructure from prior middleware

  // Update cluster in database
  try {
    const cluster = await Cluster.findById(clusterId);
    if (!cluster) {
      return res.status(404).send('Cluster not found');
    }

    // Check cluster owner
    if (cluster.ownerId !== userId) {
      return res.status(403).send('User is not authorized to update this cluster');
    }

    // Assign new value of favorite
    cluster.favorite === false // if currently cluster.favorite is false
    ? cluster.favorite = true // reassign to true
    : cluster.favorite = false // reassign to false

    // User is authorized, update the cluster
    await Cluster.findByIdAndUpdate(clusterId, {
      favorite: cluster.favorite
    })
    console.log('Favorite clusters updated successfully');
    return next();
  } catch (err) {
    return next({
      log: `clusterController.favoriteCluster: ERROR ${err}`,
      status: 400,
      message: { err: "Error occurred in clusterController.favoriteCluster." },
    });
  }
};


// Export
module.exports = clusterController;
