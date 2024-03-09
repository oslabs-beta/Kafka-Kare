const User = require("../models/userModel.js");
const Cluster = require("../models/clusterModel.js");

const testingController = {};

testingController.getAllUsers = async (req, res, next) => {
  console.log("In testingController.getAllUsers"); // testing

  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(200).json({ message: "No users have signed up" });
    } else if (users.length > 0) {
      res.locals.allUsers = users;
      return next();
    }
  } catch (err) {
    return next({
      log: `testingController.getAllUsers: ERROR ${err}`,
      status: 400,
      message: { err: "Error occurred in testingController.getAllUsers." },
    });
  }
};

testingController.getAllClusters = async (req, res, next) => {
  console.log("In testingController.getAllClusters"); // testing

  try {
    const clusters = await Cluster.find({});
    if (clusters.length === 0) {
      return res.status(200).json({ message: "No clusters have been created" });
    } else if (clusters.length > 0) {
      res.locals.allClusters = clusters;
      return next();
    }
  } catch (err) {
    return next({
      log: `testingController.getAllClusters: ERROR ${err}`,
      status: 400,
      message: { err: "Error occurred in testingController.getAllClusters." },
    });
  }
};

// Export
module.exports = testingController;
