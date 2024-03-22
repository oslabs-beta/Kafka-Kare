const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const tokenController = require("../controllers/tokenController");


// WIP // Route for retrieving user's dark mode status
router.get(
    '/colormode', 
    tokenController.verifyToken,
    settingsController.getColor,
    (req, res) => {
      console.log('Sending color mode and username back to client...');
      return res.status(200).json({ colorMode: res.locals.colorMode, username: res.locals.username })
    }
)


// WIP // Route for toggling user's dark mode status
router.get(
    '/colormode/toggle', 
    tokenController.verifyToken,
    settingsController.toggleColor,
    (req, res) => {
      console.log('Sending new color mode back to client...');
      return res.status(200).json({ colorMode: res.locals.colorMode, username: res.locals.username })
    }
)

module.exports = router;