const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/tokenController");
const oAuthController = require("../controllers/oAuthController");

// Route for user sign up/in - Google
router.post(
  "/google",
  oAuthController.googleCreateUser,
  tokenController.issueToken,
  (req, res) => {
    return res.status(201).json({ message: `User registered successfully: ${res.locals.username} via Google OAuth` });
  }
)

// Route for user sign up/in - Github
router.post(
  "/github",
  oAuthController.githubCreateUser,
  tokenController.issueToken,
  (req, res) => {
    return res.status(201).json({ message: `User registered successfully: ${res.locals.username} via Github OAuth` });
  }
)

module.exports = router;