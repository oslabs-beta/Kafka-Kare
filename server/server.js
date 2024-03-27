// Access to environmental variables
require("dotenv").config();
const User = require('./models/userModel');//delete later, this is for testing
// Import dependencies
const express = require("express");
const next = require("next");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require('axios');

// Import routes
const authRoutes = require("./routes/authRoutes");
const clustersRoutes = require("./routes/clustersRoutes");
const metricsRoutes = require("./routes/metricsRoutes");
const testingRoutes = require('./routes/testingRoutes');
const slackRoutes = require('./routes/slackRoutes');

// Setup Next app
const PORT = 3001;
const dev = process.env.NODE_ENV !== "production"; // dev = true if node_env IS NOT production
const app = next({ dev }); // initializes an instance of a NextJS app
const handle = app.getRequestHandler(); // handles page routing


// Prepare to serve the NextJS app
app.prepare().then(() => {
  const server = express();

  // CORS middleware
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  }
  server.use(cors(corsOptions));

  // Middleware
  server.use(cookieParser());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // Retrieve environmental variables for MongoDB auth // Defined in docker-compose.yml
  // const DB_USER = process.env.MONGO_DB_USERNAME
  // const DB_PASS = process.env.MONGO_DB_PWD

  // Connect to mongoDB
  // when starting app locally, use "mongodb://admin:password@localhost:27017" URL instead
  const mongoURI = `mongodb://admin:supersecret@mongo`
  // const mongoURI = "mongodb://admin:password@localhost:27017" // when starting app locally, use this URL instead
  const mongoURIAtlas = process.env.MONGODB_URI;

  mongoose.connect(mongoURI);
  mongoose.connection.once("open", () => {
      console.log("Connected to Database");
    });
  // options for mongoose.connect
  //   {useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 10s
  // }

//================== TEST

  // Test MongoDB connection route
  server.get('/test-db', async (req, res) => {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      const connectionState = mongoose.connection.readyState;
      if (connectionState === 1) {
        res.status(200).json({ message: 'Successfully connected to MongoDB' });
      } else {
        res.status(500).json({ message: 'Failed to connect to MongoDB', connectionState });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error connecting to MongoDB', error: error.message });
    }
  });


//=========================== TEST 

//=========================== TEST
server.get('/api/get-datasources', async (req, res) => {
  try {
    const response = await axios.get('http://grafana:3000/api/datasources', {
      headers: {
        'Authorization': `Bearer ${process.env.GRAFANA_SERVICE_ACCOUNT_TOKEN}`
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to get datasources:', error.response.data);
    res.status(500).json({ message: error.message });
  }
});

//================================================================================================
// this is the code to update the datasource file in the backend server so it won't be overwritten
// const fs = require('fs');
// const yaml = require('js-yaml');

// server.put('/api/update-datasource-file/:id', (req, res) => {
//   try {
//     // Load the datasource configuration from the yml file
//     const fileContents = fs.readFileSync('/path/to/your/datasource.yml', 'utf8');
//     const data = yaml.safeLoad(fileContents);

//     // Update the port in the datasource configuration
//     data.datasources[0].url = `http://prometheus:${newPort}/api/v1/query_range`;

//     // Write the updated configuration back to the yml file
//     const newYaml = yaml.safeDump(data);
//     fs.writeFileSync('/path/to/your/datasource.yml', newYaml, 'utf8');

//     // Return a success response
//     res.status(200).json({ message: 'Datasource file updated successfully' });
//   } catch (error) {
//     // Return an error response
//     console.error('Failed to update datasource file:', error);
//     res.status(500).json({ message: error.message });
//   }
// });


//=============================  
  // Custom routes
  server.use("/auth", authRoutes); 
  server.use("/clusters", clustersRoutes); 
  server.use("/metrics", metricsRoutes);
  server.use("/testing", testingRoutes); // testing
  server.use("/slack", slackRoutes);
  server.use("/api", grafanaApiRoutes);

  // Fallback route
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  // Express global error handler
  server.use((err, req, res, next) => {
    const defaultObj = {
      log: "Express error handler caught unknown middleware error",
      status: 500,
      message: { err: "An error occurred" },
    };
    const errObj = Object.assign({}, defaultObj, err);
    console.log(errObj.log);
    return res.status(errObj.status).json(errObj.message);
  });

  // Start server
  server.listen(PORT, () => {
    console.log(`🚀 Server launching on http://localhost:${PORT}`);
  });
});
