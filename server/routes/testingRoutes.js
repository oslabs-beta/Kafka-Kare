const express = require("express");
const router = express.Router();
const testingController = require("../controllers/testingController");

// Route for getting all users
router.get(
    '/users', 
    testingController.getAllUsers, 
    (req, res) => {
        return res.status(200).json(res.locals.allUsers);
});


// Route for getting all clusters
router.get(
    '/clusters',
    testingController.getAllClusters,
    (req, res) => {
        return res.status(200).json(res.locals.allClusters);
});

module.exports = router;