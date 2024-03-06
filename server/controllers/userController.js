const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");

const userController = {};

// Middleware function to handle user creation (registration)
userController.createUser = async (req, res, next) => {
  // testing
  console.log('In userController.createUser');
  console.log('req.body contains: ', req.body);

  // Destructure variables from req.body
  const { username, password } = req.body;

  // Create user in database
  try {
    const user = await User.create({
      username: username,
      password: password
    });
    console.log('New user stored in database: ', user.username);
    res.locals.username = user.username;
    return next();
  } catch (err) {
    return next({
      log: `userController.createUser: ERROR ${err}`,
      status: 400,
      message: { err: "Error occurred in userController.createUser." },
    });
  }
};

// Middleware function to handle user verification (login)
userController.verifyUser = async (req, res, next) => {
  // testing
  console.log('In userController.verifyUser');
  console.log('req.body contains: ', req.body);

  // Destructure from req.body
  const { username, password } = req.body;

  // Query database for user
  try {
    const user = await User.findOne({
      username: username
    })
    // No user found
    if (!user) {
      console.log('Username was not found'); // testing 
      return res.status(401).json({ err: 'Invalid credentials.' });
    }
    else {
      console.log('User found. Checking password...');
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        console.log('Invalid password'); // testing
        return res.status(401).json({ err: 'Invalid credentials.' });
      }
      console.log(`Password verified. ${user.username} logged in.`);
      res.locals.username = user.username;
      return next();
    }
  } catch (err) {
    return next({
      log: `userController.verifyUser: ERROR ${err}`,
      status: 400,
      message: { err: "Error occurred in userController.verifyUser." },
    });
  }
};

// Export
module.exports = userController;
