const express = require("express");
const router = express.Router();
const slackController = require("../controllers/slackController");
const tokenController = require("../controllers/tokenController");

// Route for adding Slack link // untested
router.post(
  "/add",
  tokenController.verifyToken,
  slackController.updateSlack,
  (req, res) => {
    return res.status(200).json({ message: 'Slack link added successfully' });
  }
);

// Route for editing Slack link // untested
router.patch(
  '/edit',
  tokenController.verifyToken,
  slackController.updateSlack,
  (req, res) => {
    return res.status(200).json({ message: 'Slack link updated successfully' });
  }
)

// Route for deleting Slack link
router.get(
    '/delete',
    tokenController.verifyToken,
    slackController.deleteSlack,
    (req, res) => {
      return res.status(200).json({ message: 'Slack link deleted successfully' });
    }
  )

module.exports = router;
