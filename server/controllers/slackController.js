const User = require("../models/userModel.js");

const slackController = {};

/* -------------------------------- ADD SLACK ------------------------------- */
slackControllerer.addSlack = async (req, res, next) => {
  console.log("In slackControllerer.addSlack"); // testing
  console.log('req.body contains: ', req.body);
  const { slackUrl } = req.body; // Destructure from req.body
  const { userId } = res.locals; // Destructure from prior middleware

  // Add slack link to database
  try {
    const response = await User.
    return next();

  } catch (err) {
    return next({
        log: `slackControllerer.addSlack: ERROR ${err}`,
        status: 500,
        message: { err: "Error occurred in slackControllerer.addSlack." },
      });
  }
};

/* ---------------------------- ADD/UPDATE SLACK ---------------------------- */
slackControllerer.updateSlack = async (req, res, next) => {
    console.log("In slackControllerer.updateSlack"); // testing
    console.log('req.body contains: ', req.body);
    const { slackUrl } = req.body; // Destructure from req.body
    const { userId } = res.locals; // Destructure from prior middleware
  
    // Add slack link to database
    try {
      const updatedSlackUrl = await User.findByIdAndUpdate(userId, {
        slackUrl: slackUrl
      }, { new: true }); // not necessary here, but better aligns with understanding

      if (!updatedSlackUrl) return res.status(404).send('Cluster not found');

      return next();
    } catch (err) {
      return next({
          log: `slackControllerer.updateSlack: ERROR ${err}`,
          status: 500,
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
          status: 500,
          message: { err: "Error occurred in slackControllerer.deleteSlack." },
        });
    }
  };

// Export
module.exports = clusterController;
