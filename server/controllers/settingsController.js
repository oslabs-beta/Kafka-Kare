const { color } = require("framer-motion");
const User = require("../models/userModel.js");

const settingsController = {};

/* -------------------------- GET DARK MODE STATUS -------------------------- */
settingsController.getColor = async (req, res, next) => {
  console.log("In settingsController.getColor"); // testing
  const { userId } = res.locals; // Destructure from prior middleware

  // Get user from database
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.locals.colorMode = user.settings.colorMode;
    console.log("User color mode status retrieved");
    return next();
  } catch (err) {
    return next({
      log: `settingsController.getColor: ERROR ${err}`,
      status: 500,
      message: { err: "Error occurred in settingsController.getColor." },
    });
  }
};

/* ------------------------- TOGGLE DARK MODE STATUS ------------------------ */
settingsController.toggleColor = async (req, res, next) => {
  console.log("In settingsController.toggleColor"); // testing
  const { userId } = res.locals; // Destructure from prior middleware

  // Get user from database
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Toggle color mode
    let colorMode = user.settings.colorMode;
    colorMode !== 'dark'
    ? colorMode = 'dark'
    : colorMode = 'light';

    user.settings.colorMode = colorMode;
    await user.save();
    console.log(`User switched color mode in database: <${user.settings.colorMode}>`);

    res.locals.colorMode = colorMode;
    console.log("User color mode toggled successfully");
    return next();
  } catch (err) {
    return next({
      log: `settingsController.toggleColor: ERROR ${err}`,
      status: 500,
      message: { err: "Error occurred in settingsController.toggleColor." },
    });
  }
};

// Export
module.exports = settingsController;
