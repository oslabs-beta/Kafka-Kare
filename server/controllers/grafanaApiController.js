const axios = require("axios");
const grafanaApiController = {};

/* ------------------ ADD PROMETHEUS DATA SOURCE TO GRAFANA ----------------- */
grafanaApiController.addDatasource = async (req, res, next) => {
  try {
    return next();
  } catch (err) {
    return next();
  }
}

/* ----------------- ADD DASHBOARD CONNECTED TO DATA SOURCE ----------------- */

// Export
module.exports = grafanaApiController;