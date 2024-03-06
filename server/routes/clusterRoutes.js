const express = require("express");
const router = express.Router();
const userController = require("../controllers/clusterController");


// Route for getting all clusters
router.get('/', clusterController.getClusters, (req, res) => {
    return res.status(201).json({ message: `Retrieving clusters` });
});


// Route for adding a cluster
router.post('/', clusterController.addCluster, (req, res) => {
    return res.status(201).json({ message: 'Cluster added successfully' });
});

module.exports = router;