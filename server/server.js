// Access to environmental variables
require("dotenv").config();

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

  // Connect to mongoDB
  const mongoURI = `mongodb://admin:supersecret@mongo`;
  const mongoURIAtlas = process.env.MONGODB_URI;

  mongoose.connect(mongoURI);
  mongoose.connection.once("open", () => {
    console.log("Connected to Database");
  });
  

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
