const User = require("../models/userModel.js");

const slackController = {};

/* ---------------------------- ADD/UPDATE SLACK ---------------------------- */
slackController.updateSlack = async (req, res, next) => {
    console.log("In slackController.updateSlack"); // testing
    console.log('req.body contains: ', req.body);
    const { slackUrl } = req.body; // Destructure from req.body
    const { userId } = res.locals; // Destructure from prior middleware
  
    // Add slack link to database
    try {
      const updatedSlackUrl = await User.findByIdAndUpdate(userId, {
        slackUrl: slackUrl
      }, { new: true }); // not necessary here, but better aligns with understanding

      if (!updatedSlackUrl) return res.status(404).send('User\'s slack url not found');

      return next();
    } catch (err) {
      return next({
          log: `slackController.updateSlack: ERROR ${err}`,
          status: 500,
          message: { err: "Error occurred in slackController.updateSlack." },
        });
    }
  };

/* ------------------------------ DELETE SLACK ------------------------------ */
slackController.deleteSlack = async (req, res, next) => {
    console.log("In slackController.deleteSlack"); // testing
    const { userId } = res.locals; // Destructure from prior middleware
  
    // Delete slack link from database
    try {
      // there is a more absolute way with $unset, but this way is more semantic
      const updatedSlackUrl = await User.findByIdAndUpdate(userId, {
        slackUrl: '' 
      }, { new: true }); // not necessary here, but better aligns with understanding

      if (!updatedSlackUrl) return res.status(404).send('User\'s slack url not found');

      return next();
    } catch (err) {
      return next({
          log: `slackController.deleteSlack: ERROR ${err}`,
          status: 500,
          message: { err: "Error occurred in slackController.deleteSlack." },
        });
    }
  };

// Export
module.exports = clusterController;
