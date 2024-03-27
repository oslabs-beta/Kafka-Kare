const axios = require("axios");
const User = require("../models/userModel.js");

const oAuthController = {};

/* -------------------------- GOOGLE - CREATE USER -------------------------- */
oAuthController.googleCreateUser = async (req, res, next) => {
  console.log("In oAuthController.googleCreateUser"); // testing
  const { username, email, oAuthProvider } = req.body; // Destructure from req.body

  // Store user in database
  try {
    console.log('Searching database for record of user');
    const isUserInDatabase = await User.findOne({ 
      username: username,
      email: email,
      oAuthProvider: oAuthProvider
    });
    console.log ('isUserInDatabase: ', isUserInDatabase);

    if (isUserInDatabase) {
      console.log('User found in database');
      res.locals.userId = isUserInDatabase.id;
      res.locals.username = isUserInDatabase.username;
      return next();
    }

    // User was not found in database, therefore we must create
    console.log('User was not found in database. Creating new user.')
  
    const user = await User.create({
      username: username,
      email: email,
      oAuthProvider: oAuthProvider
    });
    res.locals.userId = user.id;
    res.locals.username = user.username;
    console.log(`New user stored in database: <${user.username}> via Google OAuth`);
    return next();
  } catch (err) {
    return next({
      log: `oAuthController.googleCreateUser: ERROR ${err}`,
      status: 500,
      message: { err: "Error occurred in oAuthController.googleCreateUser." },
    });
  }
};

/* -------------------------- GITHUB - CREATE USER -------------------------- */
oAuthController.githubCreateUser = async (req, res, next) => {
  console.log("In oAuthController.githubCreateUser"); // testing
  const { username, email, oAuthProvider } = req.body; // Destructure from req.body

  // Store user in database
  try {
    console.log('Searching database for record of user');
    const isUserInDatabase = await User.findOne({ 
      username: username,
      email: email,
      oAuthProvider: oAuthProvider
    });
    console.log ('isUserInDatabase: ', isUserInDatabase);

    if (isUserInDatabase) {
      console.log('User found in database');
      res.locals.userId = isUserInDatabase.id;
      res.locals.username = isUserInDatabase.username;
      return next();
    }

    // User was not found in database, therefore we must create
    console.log('User was not found in database. Creating new user.')
  
    const user = await User.create({
      username: username,
      email: email,
      oAuthProvider: oAuthProvider
    });
    res.locals.userId = user.id;
    res.locals.username = user.username;
    console.log(`New user stored in database: <${user.username}> via Github OAuth`);
    return next();
  } catch (err) {
    return next({
      log: `oAuthController.githubCreateUser: ERROR ${err}`,
      status: 500,
      message: { err: "Error occurred in oAuthController.githubCreateUser." },
    });
  }
};

// Export
module.exports = oAuthController;