const axios = require("axios");
const metricsController = {};

const getPrometheusURI = async (userId) => {
  // Retrieve user's promURI from database
};

/* ------------------------------- Get metrics ------------------------------ */
metricsController.getMetrics = async (req, res, next) => {
  console.log("In metricsController.getMetrics"); // testing
  const { clusterId } = req.params; // Destructure from prior request params
  const userId = res.locals.userId; // Destructure from prior middleware

  /* -------------------------------------------------------------------------- */
  /*                                     WIP                                    */
  /* -------------------------------------------------------------------------- */

  try {
    // endpoint for executing instant queries in Prometheus
    const response = await axios.get(`http://prometheus:9090/api/v1/query`, { 
        // simple special query that returns up(1) or down(0) to check health or availability of the services Prometheus is monitoring
        params: {
          query: "up", 
        }
      });

    res.locals.data = response.data;
    return next();
  } catch (err) {
    return next({
      log: `metricsController.getMetrics: ERROR ${err}`,
      status: 400,
      message: { err: "Error occurred in metricsController.getMetrics." },
    });
  }
};

// Export
module.exports = metricsController;
