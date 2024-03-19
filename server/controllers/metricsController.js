const axios = require("axios");
const metricsController = {};
const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'

// Setting maximum rate of Slack notifications to once per minute
const THROTTLE_TIME_IN_MS = 60000;
const THROUGHPUT_THRESHOLD_UPPER = 1.2; // Explain business logic in comments here
let lastNotificationTime = 0; // Initialize outside for closure


/* ------------------------------- GET METRICS ------------------------------ */
metricsController.getMetrics = async (req, res, next) => {
  console.log("In metricsController.getMetrics"); // testing
  const { clusterId } = req.params; // Destructure from prior request params // Later use clusterId 
  const userId = res.locals.userId; // Destructure from prior middleware // Later use userId

  // Prometheus query for throughput
  // ** Must start producer/consumer scripts to see meaningful data
  const query = `rate(kafka_server_brokertopicmetrics_messagesin_total{topic="test-topic"}[1m])`;

  // // // More visually interesting query, but useless metric // testing
  // const query = `scrape_duration_seconds`

  try {
    // Explicitly print out our prometheus query // testing
    console.log('query: ', query);

    console.log('Sending query to Prometheus...')
    const queryResponse = await axios.get(`http://prometheus:9090/api/v1/query`, { 
        params: { query }
      });
    
    console.log('Retrieved data successfully');
    const queryData = queryResponse.data.data.result // This is the form of the response from Prometheus

    if (queryData.length < 1) {
      console.log('Data retrieved from Prometheus is empty');
      res.locals.graphData = {}; // ensures graphData exists even if empty
      return next();
    }

    // Persist data retrieved from Prometheus
    const timestamp = queryData[0].value[0];
    const dataPointFloat = parseFloat(queryData[0].value[1]);
    const dataPoint = dataPointFloat.toFixed(2);
    console.log('timestamp: ', timestamp);
    console.log('dataPoint: ', dataPoint);
    res.locals.graphData = { timestamp, dataPoint };

    // Converting to human-readable timestamp
    const readableTimestamp = new Date(timestamp * 1000).toISOString();
    console.log('Readable Timestamp: ', readableTimestamp);

    return next();
  } catch (err) {
    return next({
      log: `metricsController.getMetrics: ERROR ${err}`,
      status: 500,
      message: { err: "Error occurred in metricsController.getMetrics." },
    });
  }
};


/* --------------------------- SLACK NOTIFICATION --------------------------- */
metricsController.checkAndSendNotification = async (req, res, next) => {
  console.log("In metricsController.checkAndSendNotification"); // testing
  const { graphData } = res.locals; // Destructure from prior middleware 
  

  // This is the threshold check
  if (graphData.dataPoint <= THROUGHPUT_THRESHOLD_UPPER) {
    console.log('Metrics below threshold, proceeding')
    return next();
  }

  // This is the throttle check
  const currentTime = Date.now();
  const timeSinceLastNotification = currentTime - lastNotificationTime;
  if (timeSinceLastNotification <= THROTTLE_TIME_IN_MS) {
    console.log('Message is being throttled to avoid spamming');
    return next();
  }

  console.log('Metrics exceed threshold. Sending Slack notification...')
  const messagesPerSecond = graphData.dataPoint;

  // testing
  console.log(SLACK_WEBHOOK_URL);
  console.log(THROUGHPUT_THRESHOLD_UPPER);
  // testing

  try {
      // text: `Alert set for: <${THROUGHPUT_THRESHOLD_UPPER}> messages per second. Current rate: <${messagesPerSecond}> messages per second.`
      await axios.post(SLACK_WEBHOOK_URL, {
        text: `Alert set for: <${THROUGHPUT_THRESHOLD_UPPER}> messages per second. Current rate: <${messagesPerSecond}> messages per second.`
      });
      console.log(`Notification sent to Slack successfully`);
      lastNotificationTime = currentTime; // Update the time of the last notification
      return next();

  } catch (err) {
    return next({
      log: `metricsController.checkAndSendNotification: ERROR ${err}`,
      status: 500,
      message: { err: "Error occurred in metricsController.checkAndSendNotification." },
    });
  }
}

// Export
module.exports = metricsController;
