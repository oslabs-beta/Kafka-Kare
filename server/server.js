// Access to environmental variables
require("dotenv").config();

// Import dependencies
const express = require("express");
const next = require("next");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import routes
const authRoutes = require("./routes/authRoutes");
const clustersRoutes = require("./routes/clustersRoutes");
const metricsRoutes = require("./routes/metricsRoutes");
const testingRoutes = require("./routes/testingRoutes");

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

  // Connect to mongoDB
  // Use either environmental variables (production) or literal string (development/testing)
  // Use either Docker containerized MongoDB or MongoDB Atlas
  // const mongoURI = process.env.MONGODB_URI; //environmental
  // const mongoURI = 'mongodb://KafkaKare:sHRtyVkFa7aOykcX@mongo:27017/kafka-kare?authSource=admin'; // Docker containerized
  const mongoURI = 'mongodb+srv://KafkaKare:sHRtyVkFa7aOykcX@kafka-kare.e2s35ya.mongodb.net/?retryWrites=true&w=majority&appName=Kafka-Kare'; // MongoDB Atlas
  mongoose.connect(mongoURI);
  mongoose.connection.once("open", () => {
    console.log("Connected to Database");
  });


  // Custom routes
  server.get("/hello", (req, res) => {
    return res.status(200).send("Hello world");
  });
  server.use("/auth", authRoutes); // endpoints at /auth/signup and /auth/login
  server.use("/clusters", clustersRoutes); // endpoints at /clusters and /clusters/favorites and /clusters/notFavorites
  server.use("/metrics", metricsRoutes); // endpoints at /metrics/:clusterId
  server.use("/testing", testingRoutes); //endpoints at /testing/users and /testing/clusters

  // Fallback route
  // This line is crucial when integrating Next.js with a custom server like Express, handles 404
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
