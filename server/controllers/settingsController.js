const User = require("../models/userModel.js");

const settingsController = {};

/* -------------------------- GET DARK MODE STATUS -------------------------- */
settingsController.getDarkModeStatus = async (req, res, next) => {
  console.log("In settingsController.getDarkModeStatus"); // testing  
  const { userId } = res.locals; // Destructure from prior middleware

  // Get user from database 
  try {
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send('User not found');
    }  

    res.locals.darkModeStatus = user.settings.darkModeStatus;
    console.log('User dark mode status retrieved');
    return next();
  } catch (err) {
    return next({
      log: `settingsController.getDarkModeStatus: ERROR ${err}`,
      status: 500,
      message: { err: "Error occurred in settingsController.getDarkModeStatus." },
    });
  }
};

/* ------------------------- TOGGLE DARK MODE STATUS ------------------------ */
settingsController.toggleDarkModeStatus = async (req, res, next) => {
    console.log("In settingsController.toggleDarkModeStatus"); // testing  
    const { userId } = res.locals; // Destructure from prior middleware
    const { darkModeStatus } = req.body;
  
    // Get user from database 
    try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send('User not found');
      }  
  
      res.locals.darkMode = user.settings.darkMode;
      console.log('User dark mode status updated successfully');
      return next();
    } catch (err) {
      return next({
        log: `settingsController.toggleDarkModeStatus: ERROR ${err}`,
        status: 500,
        message: { err: "Error occurred in settingsController.toggleDarkModeStatus." },
      });
    }
  };

// Export
module.exports = settingsController;
