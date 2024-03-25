const axios = require("axios");
const User = require("../models/userModel.js");

const oAuthController = {};

/* -------------------------- GOOGLE - CREATE USER -------------------------- */
oAuthController.googleCreateUser = async (req, res, next) => {
    console.log("In oAuthController.googleCreateUser"); // testing
    const { email, oAuthProvider } = req.body; // Destructure from req.body
  
    // Store user in database
    try {
      console.log('Searching database for record of user');
      const isUserInDatabase = await User.find({ username: email });
      console.log ('isUserInDatabase: ', isUserInDatabase);

      if (isUserInDatabase.length > 0) {
        console.log('User found in database');
        res.locals.userId = isUserInDatabase.id;
        res.locals.username = isUserInDatabase.username;
        return next();
      }

      // User was not found in database, therefore we must create
      console.log('User was not found in database. Creating new user.')
    
      const user = await User.create({
        username: email,
        email: email,
        oAuthProvider: oAuthProvider
      });
      res.locals.userId = user.id;
      res.locals.username = user.username;
      console.log(`New user stored in database: <${user.username}> via OAuth`);
      return next();
    } catch (err) {
      return next({
        log: `oAuthController.googleCreateUser: ERROR ${err}`,
        status: 500,
        message: { err: "Error occurred in oAuthController.googleCreateUser." },
      });
    }
  };
  

// Export
module.exports = oAuthController;