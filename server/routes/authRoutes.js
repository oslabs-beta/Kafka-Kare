const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");

// Route for user signup
router.post(
  '/signup', 
  userController.createUser, 
  tokenController.issueToken,
  (req, res) => {
    return res.status(201).json({ message: `User registered successfully: ${res.locals.username}` });
});


// Route for user login
router.post(
  '/login', 
  userController.verifyUser, 
  tokenController.issueToken,
  (req, res) => {
    return res.status(200).json({ message: `User logged in successfully: ${res.locals.username}` });
});


// Route for user logout
router.get(
  '/logout',
  tokenController.verifyToken,
  userController.logout, 
  (req, res) => {
    return res.status(201).json({ message: `User logged out successfully: ${res.locals.username}` });
});

module.exports = router;