const axios = require("axios");
const User = require("../models/userModel.js");
const serviceAccountToken = process.env.GRAFANA_SERVICE_ACCOUNT_TOKEN;

const grafanaApiController = {};

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


  // // Template for new dashboard
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
  // // End of Template for new dashboard


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
    console.log('response.data.uid: ', response.data.uid)
    res.locals.uid = response.data.uid;

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
  const { uid } = res.locals;
  console.log('uid: ', uid);
  
  // const fakeUid = 'adgxqf88b1p1cb';
  const requestHeaders = {
    headers: { Authorization: `Bearer ${serviceAccountToken}` },
  };

  // Send request to Grafana API to dislpay a dashboard
  try {
    const response = await axios.get(`http://grafana:3000/api/dashboards/uid/${uid}`, requestHeaders);
    // const response = await axios.get(`http://grafana:3000/api/dashboards/uid/${fakeUid}`, requestHeaders);

    const dashboardConfig = response.data.dashboard;
    console.log('dashboardConfig: ', dashboardConfig);
    console.log('API call to Grafana successful');

    res.locals.dashboardConfig = dashboardConfig;

    // Working on iFrame
    const iFrame = `http://localhost:3002/d/${dashboardConfig.uid}/${dashboardConfig.id}?orgId=1&theme=light`;

    console.log('iFrame: ', iFrame);
    res.locals.iFrame = iFrame;

    //http://grafana:3000/d-solo/fdgy6ul23iadca/20?orgId=1&theme=light

    // <iframe src="http://<grafana-host>:<grafana-port>/d-solo/<dashboard-uid>/<panel-id>?orgId=<org-id>&theme=<theme>" width="450" height="200" frameborder="0"></iframe>
//http://<grafana-host>:<grafana-port>/d-solo/<dashboard-uid>/<panel-id>?orgId=<org-id>&theme=<theme>

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




/* ------------------------- SAVE DASHBOARD TO USER ------------------------- */
// grafanaApiController.saveUid = async (req, res, next) => {
//   console.log("In grafanaApiController.saveUid"); // testing
//   const { userId, uid } = res.locals;

//   console.log(`Saving graph <${uid}> to user <${userId}>`);

//   // Save to database
//   try {


//   return next();
// } catch (err) {
//     return next({
//       log: `grafanaApiController.saveUid: ERROR ${err}`,
//       status: 500,
//       message: {
//         err: "Error occurred in grafanaApiController.saveUid.",
//       },
//     });
//   }
// };


// Export
module.exports = grafanaApiController;
