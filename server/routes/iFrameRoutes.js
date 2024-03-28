const express = require("express");
const router = express.Router();
const iFrameController = require("../controllers/iFrameController");
const tokenController = require("../controllers/tokenController");

// Route for retrieving cluster's iFrame from database
router.get(
    '/:clusterId',
    // tokenController.verifyToken,
    iFrameController.getIFrame,
    (req, res) => {
      console.log('Sending iFrame back to client...');
      // return res.status(200).json({message: "Dashboard created from datasource successfully", data: res.locals.data});
      return res.status(200).json(res.locals.iFrame);
    }
  );

module.exports = router;
