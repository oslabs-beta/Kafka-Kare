const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/tokenController");
const oAuthController = require("../controllers/oAuthController");

// Route for user verification via Google OAuth
router.post(
  "/google",
  oAuthController.googleCreateUser,
  tokenController.issueToken,
  (req, res) => {
    return res.status(201).json({ message: `User registered successfully: ${res.locals.username} via OAuth` });
  }
)

module.exports = router;