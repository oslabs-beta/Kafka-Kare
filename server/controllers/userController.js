const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");

const userController = {};

// ---------------------------- CREATE USER ---------------------------- //
userController.createUser = async (req, res, next) => {
  console.log('In userController.createUser'); // testing
  console.log('req.body contains: ', req.body);
  const { username, password } = req.body; // Destructure from req.body

  // Create user in database
  try {
    const user = await User.create({
      username: username,
      password: password
    });
    console.log('New user stored in database: ', user.username);
    res.locals.userId = user.id;
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


// ---------------------------- VERIFY USER ---------------------------- //
userController.verifyUser = async (req, res, next) => {
  console.log('In userController.verifyUser'); // testing
  console.log('req.body contains: ', req.body);
  const { username, password } = req.body; // Destructure from req.body

  // Find user in database
  try {
    const user = await User.findOne({ username: username })
    // No user found
    if (!user) {
      return res.status(401).json({ err: 'Invalid credentials.' });
    }
    else {
      console.log('User found. Checking password...');
      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        return res.status(401).json({ err: 'Invalid credentials.' });
      }

      console.log(`Password verified. ${user.username} logged in.`);

      res.locals.username = user.username;
      res.locals.userId = user.id;
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

userController.logout = async (req, res, next) => {
  console.log('In userController.logout'); // testing
  const userId = res.locals.userId;

  // Find user in database
  try {
    const user = await User.findById(userId);
    // No user found
    if (!user) {
      return res.status(401).json({ err: 'Id not found' });
    }
    else {
      console.log('User logged out successfully');
      res.cookie('token', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
      })
      return next();
    }
  } catch (err) {
    return next({
      log: `userController.logout: ERROR ${err}`,
      status: 400,
      message: { err: "Error occurred in userController.logout." },
    });
  }
};


// Export
module.exports = userController;
