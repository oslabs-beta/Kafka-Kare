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

    // PromQL query for throughput
    // ** Must start producer/consumer scripts to see meaningful data
    const query = `rate(kafka_server_brokertopicmetrics_messagesin_total{topic="test-topic"}[1m])`;

    // // // More visually interesting, useless metric // testing
    // const query = `scrape_duration_seconds`

    // Explicitly print out our prometheus query // testing
    console.log('query: ', query);

    console.log('Sending query to Prometheus...')
    const queryResponse = await axios.get(`http://prometheus:9090/api/v1/query`, { 
        params: { query }
      });

    console.log('Retrieved data successfully');
    const queryData = queryResponse.data.data.result // This is the form of the response from Prometheus

    // Testing
    const timestamp = queryData[0].value[0];
    const data = queryData[0].value[1];

    console.log('timestamp: ', timestamp);
    console.log('data: ', data);

    if (parseFloat(data) > 1.5) {
      // // Throughput threshold exceeded, send notification to Slack
      // await axios.post(SLACK_WEBHOOK_URL, {
      //   text: `Throughput has climbed over 1.5 messages per second. Current rate: ${data} messasges/second`
      // });
      console.log('Notification sent to Slack.');
    };
    // Testing

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
