const express = require("express");
const router = express.Router();
const clusterController = require("../controllers/clusterController");


// Route for getting all clusters
router.get('/', clusterController.getClusters, (req, res) => {
    return res.status(201).json({ message: `Retrieving clusters` });
});


// Route for adding a cluster
router.post('/', clusterController.addCluster, (req, res) => {
    return res.status(201).json({ message: 'Cluster added successfully' });
});

module.exports = router;