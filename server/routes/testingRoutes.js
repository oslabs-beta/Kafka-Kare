const express = require("express");
const router = express.Router();
const testingController = require("../controllers/testingController");

// TESTING // Route for getting ALL users
router.get(
    '/users', 
    testingController.getAllUsers, 
    (req, res) => {
        console.log('TESTING ROUTE: Sending all users back to client...');
        return res.status(200).json(res.locals.allUsers);
});


// TESTING // Route for getting ALL clusters
router.get(
    '/clusters',
    testingController.getAllClusters,
    (req, res) => {
        console.log('TESTING ROUTE: Sending all clusters back to client...');
        return res.status(200).json(res.locals.allClusters);
});

module.exports = router;