const Cluster = require("../models/clusterModel.js");

const clusterController = {};

// Middleware function to handle viewing all clusters
clusterController.getClusters = async (req, res, next) => {
  // testing
  console.log('In clusterController.getClusters');
  // console.log('req.body contains: ', req.body);

  // Destructure variables from req.body

  // Find clusters in database
  try {
    const clusters = await Cluster.find({});
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
  console.log('req.body contains: ', req.body);

  // Destructure from req.body
  const { name, hostnameAndPort } = req.body;

  // // // // // // // // // // //
  // work in progress (wip) // 
  // need to get ownerId variable from the token or cookie or some authentication
  // ex. const ownerId = '239402938423423049'
  
  // testing
  const ownerId = 'testUser';

  // // // // // // // // // // //

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
