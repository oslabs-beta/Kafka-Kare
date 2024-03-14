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
      const user = await User.findByIdAndUpdate(userId, {
        slackUrl: slackUrl
      }, { new: true }); 

      if (!user) return res.status(404).send('User\'s slack url not found');
      console.log('Slack URL updated successfully: ', user.slackUrl);
      return next();
    } catch (err) {
      return next({
          log: `slackController.updateSlack: ERROR ${err}`,
          status: 500,
          message: { err: "Error occurred in slackController.updateSlack." },
        });
    }
  };


/* -------------------------------- GET SLACK ------------------------------- */
slackController.getSlack = async (req, res, next) => {
    console.log("In slackController.getSlack"); // testing
    const { userId } = res.locals; // Destructure from prior middleware
  
    // Get slack link from database
    try {
      const user = await User.findById(userId, { new: true }); 

      if (!user) return res.status(404).send('User\'s slack url not found');
      res.locals.slackUrl = user.slackUrl;
      console.log('Slack URL retrieved successfully: ', user.slackUrl);
      return next();
    } catch (err) {
      return next({
          log: `slackController.getSlack: ERROR ${err}`,
          status: 500,
          message: { err: "Error occurred in slackController.getSlack." },
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
      const user = await User.findByIdAndUpdate(userId, {
        slackUrl: '' 
      }, { new: true }); // not necessary here, but better aligns with understanding

      if (!user) return res.status(404).send('User\'s slack url not found');
      console.log('Slack URL deleted successfully');
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
module.exports = slackController;
