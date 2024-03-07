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


// Setup Next app
const PORT = 3001;
const dev = process.env.NODE_ENV !== "production"; // dev = true if node_env IS NOT production
const app = next({ dev }); // initializes an instance of a NextJS app
const handle = app.getRequestHandler(); // handles page routing


// Prepare to serve the NextJS app
app.prepare().then(() => {
  const server = express();

  // Middleware
  server.use(cors());
  server.use(cookieParser());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // Connect to mongoDB
  const mongoURI = process.env.MONGODB_URI;
  mongoose.connect(mongoURI);
  mongoose.connection.once("open", () => {
    console.log("Connected to Database");
  });


  // Custom routes
  server.get("/hello", (req, res) => {
    return res.status(200).send("Hello world");
  });
  server.use("/auth", authRoutes); // endpoints at /auth/register and /auth/login
  server.use("/clusters", clustersRoutes); // endpoints at /clusters


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
