// Access to environmental variables
require("dotenv").config();
const User = require("./models/userModel"); //delete later, this is for testing
// Import dependencies
const express = require("express");
const next = require("next");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");

// Import routes
const authRoutes = require("./routes/authRoutes");
const clustersRoutes = require("./routes/clustersRoutes");
const metricsRoutes = require("./routes/metricsRoutes");
const testingRoutes = require("./routes/testingRoutes");
const slackRoutes = require("./routes/slackRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const oAuthRoutes = require("./routes/oAuthRoutes");
const grafanaApiRoutes = require("./routes/grafanaApiRoutes");

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
    origin: "http://localhost:3000",
    credentials: true,
  };
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
  const mongoURI = `mongodb://admin:supersecret@mongo`;
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
  server.get("/test-db", async (req, res) => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const connectionState = mongoose.connection.readyState;
      if (connectionState === 1) {
        res.status(200).json({ message: "Successfully connected to MongoDB" });
      } else {
        res
          .status(500)
          .json({ message: "Failed to connect to MongoDB", connectionState });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error connecting to MongoDB", error: error.message });
    }
  });

  // TEST POST route to create a new user
  server.post("/users", async (req, res) => {
    try {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // TEST GET route to fetch all users
  server.get("/users", async (req, res) => {
    try {
      const users = await User.find({}, "username"); // Exclude passwords from the response
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  server.get("/testwhat", (req, res) => {
    return res.status(200).send("coolcoolcool");
  });

  //=========================== TEST

  // Define your service account token
  const serviceAccountToken = process.env.GRAFANA_SERVICE_ACCOUNT_TOKEN;



//=================
//===============
// const grafanaApiUrl = 'http://grafana:3000/api';
// const grafanaApiKey = process.env.GRAFANA_SERVICE_ACCOUNT_TOKEN;


//   server.post('/api/create-dashboard', async (req, res) => {
//     try {
//       const newDashboardData = {
//         dashboard: {
//           id: null,
//           refresh: '5s', // Refresh every 5 seconds
//           title: 'New Dashboard',
//           time: {
//             from: "now-5m",
//             to: "now"
//           },
//           panels: [
//             {
//               type: 'timeseries',
//               title: 'New Throughput Graph',
//               gridPos: { x: 0, y: 0, w: 24, h: 9 },
//               targets: [
//                 {
//                   refId: 'A',
//                   expr: 'rate(kafka_server_brokertopicmetrics_messagesin_total{topic="test-topic"}[1m])',
//                 },
//               ],
//               // Remove options and fieldConfig for a minimal setup
//             },
//           ],
//         },
//         folderId: 0,
//         overwrite: false,
//       };
      

//       const response = await axios.post(`${grafanaApiUrl}/dashboards/db`, newDashboardData, {
//         headers: { Authorization: `Bearer ${grafanaApiKey}` },
//       });

//       res.status(200).json(response.data);
//     } catch (error) {
//       console.error('Failed to create dashboard:', error.response.data);
//       res.status(500).json({ message: error.message });
//     }
//   });

// //=================
//   // Endpoint to create the datasource
//   server.post("/api/create-datasource", async (req, res) => {
//     const { url } = req.body;
//     console.log('url: ', url);

//     // Define your datasource configuration // Check datasourceConfig format
//     // const datasourceConfig = {
//     //   name: "Prometheus",
//     //   type: "prometheus",
//     //   url: `${url}`,
//     //   access: "proxy",
//     //   jsonData: {},
//     //   secureJsonData: {},
//     //   version: 1,
//     //   editable: true,
//     // };
//     const datasourceConfig = {
//       name: "PrometheusZZZ",
//       type: "prometheus",
//       url: `${url}`,
//       access: "proxy",
//     };

//     try {
//       console.log("datasourceConfig: ", datasourceConfig);
//       // Perform the POST request to create the datasource
//       const response = await axios.post(
//         "http://grafana:3000/api/datasources",
//         datasourceConfig,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${serviceAccountToken}`,
//           },
//         }
//       );
      
//       console.log('response: ', response);

//       // Return a success response
//       res
//         .status(200)
//         .json({
//           message: "Datasource created successfully",
//           data: response.data,
//         });
//     } catch (error) {
//       // Return an error response
//       console.error("Failed to create datasource:");
//       res.status(500).json({ message: "Failed to create datasource" });
//     }
//   });

  //==============================

  // Custom routes
  server.use("/auth", authRoutes);
  server.use("/clusters", clustersRoutes);
  server.use("/metrics", metricsRoutes);
  server.use("/testing", testingRoutes); // testing
  server.use("/slack", slackRoutes);
  server.use("/settings", settingsRoutes);
  server.use("/oauth", oAuthRoutes);
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
