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

// Import routes
const authRoutes = require("./routes/authRoutes");
const clustersRoutes = require("./routes/clustersRoutes");
const metricsRoutes = require("./routes/metricsRoutes");

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
  server.use(cors());
  server.use(cookieParser());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  const DB_USER = process.env.MONGO_DB_USERNAME
  const DB_PASS = process.env.MONGO_DB_PWD
  // Connect to mongoDB
  // when starting app locally, use "mongodb://admin:password@localhost:27017" URL instead
   const mongoURI = `mongodb://admin:supersecret@mongo`

  mongoose.connect(mongoURI);
  mongoose.connection.once("open", () => {
      console.log("Connected to Database");
    });

//options for mongoose.connect
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


// TEST POST route to create a new user 
server.post('/users', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// TEST GET route to fetch all users
server.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username'); // Exclude passwords from the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//=========================== TEST   
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
