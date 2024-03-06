const jwt = require("jsonwebtoken");

const tokenController = {};

const SECRET_KEY = process.env.SECRET_KEY;

// Middleware function to handle issuing a token
tokenController.issueToken = async (req, res, next) => {
  // testing
  console.log("In tokenController.issueToken");
  // console.log('req.body contains: ', req.body);

  // Destructure variables from req.body

  // Issue token

  return next();
};

// Middleware function to handle verifying a token
tokenController.verifyToken = async (req, res, next) => {
    // testing
    console.log("In tokenController.verifyToken");
    // console.log('req.body contains: ', req.body);
  
    // Destructure variables from req.body
  
    // Verify token
  
    return next();
};

// Export
module.exports = tokenController;






//   // Add cluster to database
//   try {
//     const newCluster = await Cluster.create({ name, hostnameAndPort, ownerId });
//     console.log('New cluster added: ', newCluster);
//     res.locals.newCluster = newCluster;
//     return next();
//     } catch (err) {
//     return next({
//       log: `clusterController.addCluster: ERROR ${err}`,
//       status: 400,
//       message: { err: "Error occurred in clusterController.addCluster." },
//     });
//   }