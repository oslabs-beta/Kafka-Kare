const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const tokenController = {};


// Middleware function to handle issuing a token
tokenController.issueToken = (req, res, next) => {
  // testing
  console.log("In tokenController.issueToken");

  // Destructure variable from prior middleware
  const userId = res.locals.userId;

  // Issue token
  const token = jwt.sign(
    { userId: userId },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  // Determine if the app is running in a production environement
  const isProduction = process.env.NODE_ENV === 'production';

  // Store the token in HTTP-only cookie
  res.cookie('token', token, { 
    httpOnly: true, 
    secure: isProduction // use 'secure' flag only in production
  });

  console.log('Token issued');

  return next();
};

// Middleware function to handle verifying a token
tokenController.verifyToken = (req, res, next) => {
    // testing
    console.log("In tokenController.verifyToken");
  
    // Destructure variable from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }

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