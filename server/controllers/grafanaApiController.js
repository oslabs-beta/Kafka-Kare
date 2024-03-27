const axios = require("axios");
const grafanaApiController = {};
const serviceAccountToken = process.env.GRAFANA_SERVICE_ACCOUNT_TOKEN;

/* ------------------ ADD PROMETHEUS DATA SOURCE TO GRAFANA ----------------- */
grafanaApiController.addDatasource = async (req, res, next) => {
  console.log("In grafanaApiController.addDatasource"); // testing
  console.log("req.body contains: ", req.body);
  const { url } = req.body; // Destructure from req.body
  const { userId } = res.locals; // Destructure from prior middleware

  // Create object to use as API call payload
  const datasourceConfig = {
    name: `Prometheus-${userId}`,
    type: "prometheus",
    url: `${url}`,
    access: "proxy",
  };
  console.log("datasourceConfig: ", datasourceConfig);

  const requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceAccountToken}`,
    }
  };

  // Send request to Grafana API to add a datasource
  try {
    const response = await axios.post(
      "http://grafana:3000/api/datasources",
      datasourceConfig,
      requestHeaders
    );
    console.log("Received response from API request: ", response);

    // Persist datasource name
    res.locals.datasourceName = datasourceConfig.name;

    console.log("Datasource created successfully");

    return next();
  } catch (err) {
    return next({
      log: `grafanaApiController.addDatasource: ERROR ${err}`,
      status: 500,
      message: { err: "Error occurred in grafanaApiController.addDatasource." },
    });
  }
};

/* ----------------- CREATE DASHBOARD CONNECTED TO DATA SOURCE ----------------- */
grafanaApiController.createDashboard = async (req, res, next) => {
  console.log("In grafanaApiController.createDashboard"); // testing
  const { userId, username, datasourceName } = res.locals; // Destructure from prior middleware

  console.log(`Creating dashboard for <${username}>`);
  console.log(`Datasource for dashboard: <${datasourceName}>`);

  // Template for new dashboard
  const newDashboardData = {
    dashboard: {
      id: null,
      refresh: "5s", // Refresh every 5 seconds
      title: `${username}'s Dashboard`,
      time: {
        from: "now-5m",
        to: "now",
      },
      panels: [
        {
          type: "timeseries",
          title: "Throughput Graph",
          gridPos: { x: 0, y: 0, w: 24, h: 9 },
          datasource: `${datasourceName}`, // Specify the datasource here
          targets: [
            {
              refId: "A",
              expr: 'rate(kafka_server_brokertopicmetrics_messagesin_total{topic="test-topic"}[1m])',
            },
          ],
        },
      ],
    },
    folderId: 0,
    overwrite: false,
  };

  const requestHeaders = {
    headers: { Authorization: `Bearer ${serviceAccountToken}` },
  };

  // Send request to Grafana API to create a dashboard
  try {
    const response = await axios.post(
      "http://grafana:3000/api/dashboards/db",
      newDashboardData,
      requestHeaders
    );
    console.log("Received response from API request : ", response);

    console.log("Dashboard created successfully");
    return next();
  } catch (err) {
    return next({
      log: `grafanaApiController.createDashboard: ERROR ${err}`,
      status: 500,
      message: {
        err: "Error occurred in grafanaApiController.createDashboard.",
      },
    });
  }
};

// Export
module.exports = grafanaApiController;
