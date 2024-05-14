const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// Load the environment variables
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON request body
app.use(express.json());

// Import routes for the TODO API
const todoRoutes = require("./routes/todos");

// import user routes
const userRoutes = require("./routes/users");

// Mount the TODO API routes
app.use("/api/v1", todoRoutes);

// Mount the user routes
app.use("/api/v1", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to the database
const dbConnect = require("./config/database");
dbConnect();

// Default route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the TODO API</h1>");
});
