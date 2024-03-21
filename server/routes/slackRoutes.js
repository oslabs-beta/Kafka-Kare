const express = require("express");
const router = express.Router();
const slackController = require("../controllers/slackController");
const tokenController = require("../controllers/tokenController");

// Route for editing Slack link
router.patch(
  "/update",
  tokenController.verifyToken,
  slackController.updateSlack,
  (req, res) => {
    return res.status(200).json({ message: "Slack link updated successfully" });
  }
);

// Route for deleting Slack link
router.get(
  "/delete",
  tokenController.verifyToken,
  slackController.deleteSlack,
  (req, res) => {
    return res.status(200).json({ message: "Slack link deleted successfully" });
  }
);

// Route for retrieving a Slack link
router.get(
  "/",
  tokenController.verifyToken,
  slackController.getSlack,
  (req, res) => {
    console.log("Sending slackUrl and username to client...");
    // return res.status(200).json(res.locals.slackUrl);
    return res.status(200).json({ slackUrl: res.locals.slackUrl, username: res.locals.username })
  }
);

module.exports = router;
