const axios = require("axios");
const connectionStringController = {};

/* ------------------------- CHECK CONNECTION STRING ------------------------ */
connectionStringController.checkConnection = async (req, res, next) => {
  console.log("In connectionStringController.checkConnection"); // testing
  const { connectionString } = req.body; // Destructure from req.body
  const userId = res.locals.userId; // Destructure from prior middleware

  try {
    const response = await axios.get(`${connectionString}/api/v1/query`, {
        params: {query: 'up'} // simple way to test connectivity
    });

    if (response.data.status !== 'success') {
        console.log('cluster online status: OFFLINE');
        res.locals.onlineStatus = 'OFFLINE';
        return next();
    }
    
    // Persist online status
    console.log('cluster online status: ONLINE');
    res.locals.onlineStatus = 'ONLINE'
    
    return next();
  } catch (err) {
    return next();
  }
}



// Export
module.exports = connectionStringController;
