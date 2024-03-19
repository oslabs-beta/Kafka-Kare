const axios = require("axios");
const metricsController = {};


/* ------------------------------- Get metrics ------------------------------ */
metricsController.getMetrics = async (req, res, next) => {
  console.log("In metricsController.getMetrics"); // testing
  const { clusterId } = req.params; // Destructure from prior request params // Later use clusterId 
  const userId = res.locals.userId; // Destructure from prior middleware // Later use userId

  // Later, customize the query for specific user/cluster

  try {
    // Prometheus query string

    // // PromQL query for throughput
    // // The actual query for throughput. Not as interesting because flatlines at 0 unless starting producer/consumer.
    // const query = `rate(kafka_server_brokertopicmetrics_messagesin_total[5m])`;

    // // More visually interesting, useless metric // testing
    const query = `scrape_duration_seconds`

    // Explicitly print out our prometheus query // testing
    console.log('query: ', query);

    console.log('Sending query to Prometheus...')
    const queryResponse = await axios.get(`http://prometheus:9090/api/v1/query`, { 
        params: { query }
      });

    console.log('Metrics data retrieved successfully');
    const queryData = queryResponse.data.data.result // This is the form of the response from Prometheus

    res.locals.queryData = queryData;
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
