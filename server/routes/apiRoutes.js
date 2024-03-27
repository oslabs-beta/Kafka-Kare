const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/tokenController");
const apiController = require("../controllers/apiController");

// Route for adding user data source to Grafana
router.post(
  "/google",
  oAuthController.googleCreateUser,
  tokenController.issueToken,
  (req, res) => {
    return res
      .status(201)
      .json({
        message: `User registered successfully: ${res.locals.username} via OAuth`,
      });
  }
);

module.exports = router;
