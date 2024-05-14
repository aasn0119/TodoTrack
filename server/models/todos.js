const mongoose = require("mongoose");

// Define the Todos schema
const todoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

// Export the Todos model
module.exports = mongoose.model("Todos", todoSchema);
