const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");

// Route for registering a user
router.post(
  '/signup', 
  userController.createUser, 
  tokenController.issueToken,
  (req, res) => {
    return res.status(201).json({ message: `User registered successfully: ${res.locals.username}` });
});


// Route for logging in
router.post(
  '/login', 
  userController.verifyUser, 
  tokenController.issueToken,
  (req, res) => {
    return res.status(200).json({ message: `User logged in successfully: ${res.locals.username}` });
});

module.exports = router;