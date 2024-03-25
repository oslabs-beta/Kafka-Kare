const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/tokenController");
const oAuthController = require("../controllers/oAuthController");

// Route for user sign up - OAuth
router.post(
    'oauth/google', 
    oAuthController.googleCreateUser,
    tokenController.issueToken,
    (req, res) => {
        return res.status(200).json({});
})