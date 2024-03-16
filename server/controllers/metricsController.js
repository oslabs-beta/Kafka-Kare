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

    // // The actual query for throughput. Not as interesting because flatlines at 0. 
    // const query = `rate(kafka_server_brokertopicmetrics_messagesin_total[5m])`;

    // More visually interesting, useless metric
    const query = `scrape_duration_seconds`
    
    console.log('query: ', query);

    console.log('Querying Prometheus...')
    const queryResponse = await axios.get(`http://prometheus:9090/api/v1/query`, { 
        params: { query }
      });

    console.log('Query response data successfully received');
    const data = response.data.data.result // This is the form of the response from Prometheus

    res.locals.queryData = data;
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
