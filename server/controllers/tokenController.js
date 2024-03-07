const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const tokenController = {};

// ---------------------------- ISSUE TOKEN ---------------------------- //
tokenController.issueToken = (req, res, next) => {
  console.log("In tokenController.issueToken"); // testing
  const userId = res.locals.userId; // Destructure from prior middleware

  // Issue token
  const token = jwt.sign(
    { userId: userId },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  // Determine if running in a production environement
  const isProduction = process.env.NODE_ENV === 'production';

  // Store the token in HTTP-only cookie
  res.cookie('token', token, { 
    httpOnly: true, 
    secure: isProduction // use 'secure' flag only in production
  });
  console.log('Token issued');

  return next();
};


// ---------------------------- VERIFY TOKEN ---------------------------- //
tokenController.verifyToken = (req, res, next) => {
    console.log("In tokenController.verifyToken"); // testing
    const token = req.cookies.token; // Destructure from cookies

    // Check token
    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }

    // Verify token, extract userId
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      console.log('Token verified');
      res.locals.userId = decoded.userId;
      return next();
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
};


// Export
module.exports = tokenController;