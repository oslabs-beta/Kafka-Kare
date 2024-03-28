const axios = require("axios");
const Cluster = require("../models/clusterModel.js");

const iFrameController = {};

/* ------------------------------- GET I-FRAME ------------------------------ */
iFrameController.getIFrame = async (req, res, next) => {
    console.log("In iFrameController.getIFrame"); // testing
    // const { clusterId } = req.params; // Destructure from req.params

    // hard code in // testing
    const clusterId = '6605f8ad3a826dad6f0072c2'; 

    // Search Database
    try {
        const cluster = await Cluster.findById(clusterId);
        console.log('Response from database received');

        // Error handling
        if (!cluster) return res.status(500).send('Error retrieving iFrame');

        // Visualize cluster
        console.log('cluster: ', cluster);

        // Retrieve grafanaUrl
        const iFrame = cluster.grafanaUrl;
        console.log('iFrame: ', iFrame);

        // Persist data
        res.locals.iFrame = iFrame;
        return next();

    } catch (err) {
        return next({
          log: `iFrameController.getIFrame: ERROR ${err}`,
          status: 500,
          message: { err: "Error occurred in iFrameController.getIFrame." },
        });
    }
}

// Export
module.exports = iFrameController;
