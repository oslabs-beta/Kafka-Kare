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

  // Use for API call
  const requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceAccountToken}`,
    },
  };

  // Send request to Grafana API to add a datasource
  try {
    const response = await axios.post(
      "http://grafana:3000/api/datasources",
      datasourceConfig,
      requestHeaders
    );

    // Persist datasource name
    res.locals.datasourceName = datasourceConfig.name;
    res.locals.url = datasourceConfig.url;
    console.log("Datasource connected successfully");
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
  const { userId, username, datasourceName, url } = res.locals; // Destructure from prior middleware

  console.log(`Creating dashboard for <${username}>`);
  console.log(`Datasource for dashboard: <${datasourceName}>`);

  // Template for new dashboard
  const newDashboardData = {
    dashboard: {
      id: null,
      refresh: "5s", // Refresh every 5 seconds
      title: `${username}-${url}-Dashboard`,
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

  // Use for API call
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

    console.log(`Dashboard using data from <${url}> created successfully`);
    
    // Persist uid
    res.locals.uid = response.data.data.uid;
    console.log('response.data.data.uid: ', response.data.data.uid);
    console.log('response.data.uid: ', response.data.uid)

    res.locals.data = response.data;
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


/* ---------------------------- DISPLAY DASHBOARD --------------------------- */
grafanaApiController.displayDashboard = async (req, res, next) => {
  console.log("In grafanaApiController.displayDashboard"); // testing
//   const { uid } = res.locals;
  const uid = 'adgxqf88b1p1cb';
  console.log('uid: ', uid);

  // Send request to Grafana API to dislpay a dashboard
  try {
    // const response = await axios.get(`http://grafana:3000/api/dashboards/uid/${uid}`);
    const response = await axios.get(`http://grafana:3000/api/dashboards/uid/${uid}`);

    const dashboardConfig = response.data.dashboard;
    console.log('dashboardConfig: ', dashboardConfig);
    console.log('API call to Grafana successful');

    res.locals.dashboardConfig = dashboardConfig;

    return next();
  } catch (err) {
    return next({
      log: `grafanaApiController.displayDashboard: ERROR ${err}`,
      status: 500,
      message: {
        err: "Error occurred in grafanaApiController.displayDashboard.",
      },
    });
  }
};

// Export
module.exports = grafanaApiController;
