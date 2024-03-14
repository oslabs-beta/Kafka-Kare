const User = require("../models/userModel.js");

const slackController = {};

/* -------------------------------- ADD SLACK ------------------------------- */
slackControllerer.addSlack = async (req, res, next) => {
  try {
    return next();

  } catch (err) {
    return next({
        log: `slackControllerer.addSlack: ERROR ${err}`,
        status: 400,
        message: { err: "Error occurred in slackControllerer.addSlack." },
      });
  }
};

/* ------------------------------ UPDATE SLACK ------------------------------ */
slackControllerer.updateSlack = async (req, res, next) => {
    try {
      return next();
  
    } catch (err) {
      return next({
          log: `slackControllerer.updateSlack: ERROR ${err}`,
          status: 400,
          message: { err: "Error occurred in slackControllerer.updateSlack." },
        });
    }
  };

/* ------------------------------ DELETE SLACK ------------------------------ */
slackControllerer.deleteSlack = async (req, res, next) => {
    try {
      return next();
  
    } catch (err) {
      return next({
          log: `slackControllerer.deleteSlack: ERROR ${err}`,
          status: 400,
          message: { err: "Error occurred in slackControllerer.deleteSlack." },
        });
    }
  };

// Export
module.exports = clusterController;
