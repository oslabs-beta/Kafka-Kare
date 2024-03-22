const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const tokenController = require("../controllers/tokenController");


// WIP // Route for retrieving user's dark mode status
router.get(
    '/settings/darkmode', 
    tokenController.verifyToken,
    settingsController.getDarkModeStatus,
    (req, res) => {
      console.log('Sending dark mode status and username back to client...');
      return res.status(200).json({ darkMode: res.locals.darkMode, username: res.locals.username })
    }
)


// WIP // Route for toggling user's dark mode status
router.post(
    '/settings/darkmode', 
    tokenController.verifyToken,
    settingsController.toggleDarkModeStatus,
    (req, res) => {
      console.log('Sending toggled dark mode status back to client...');
      return res.status(200).json({ darkMode: res.locals.darkMode, username: res.locals.username })
    }
)

module.exports = router;