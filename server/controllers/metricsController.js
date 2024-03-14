const axios = require("axios");
const metricsController = {};


/* ------------------------------- Get metrics ------------------------------ */
metricsController.getMetrics = async (req, res, next) => {
  console.log("In metricsController.getMetrics"); // testing
  const { clusterId } = req.params; // Destructure from prior request params
  const userId = res.locals.userId; // Destructure from prior middleware

  try {
    // Prometheus query string
    const query = `rate(process_cpu_seconds_total{instance="kafka-demo:9092"}[5m])`;

    console.log('Querying Prometheus...')
    const response = await axios.get(`http://prometheus:9090/api/v1/query`, { 
        params: { 
          query: query 
        }
      });
    console.log('Response successfully received');

    // This is the form the response from Prometheus takes
    res.locals.data = response.data.data.result;
    return next();
  } catch (err) {
    return next({
      log: `metricsController.getMetrics: ERROR ${err}`,
      status: 500,
      message: { err: "Error occurred in metricsController.getMetrics." },
    });
  }
};

// Export
module.exports = metricsController;
