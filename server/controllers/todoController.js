const Todos = require("../models/todos");
const { v4: uuidv4 } = require("uuid");

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { user_email, title, progress, date } = req.body;

    console.log(user_email, title, progress, date);
    // Generate a unique id for the todo
    const id = uuidv4();

    // Check if all necessary fields are provided
    if (!title || !progress || !user_email) {
      return res.status(404).json({ success: false, message: "All Fields are Required" });
    }

    // Create a new todo with the necessary information
    const todo = await Todos.create({
      id: id,
      user_email: user_email,
      title: title,
      progress: progress,
      date: date,
    });

    // Return the newly created todo in the response
    return res
      .status(200)
      .json({ success: true, data: todo, message: "Todo created successfully" });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new todo:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all Todos
exports.getTodos = async (req, res) => {
  try {
    // Get all todos from the database by user_email
    const todos = await Todos.find();
    return res.status(200).json({ success: true, data: todos });
  } catch (error) {
    console.error("Error getting todos:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a todo by user_email
exports.getTodoByMail = async (req, res) => {
  try {
    // Get all todos from the database by user_email
    const { user_email } = req.params;
    const todos = await Todos.find({ user_email: user_email });
    return res.status(200).json({ success: true, data: todos });
  } catch (error) {
    console.error("Error getting todos:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update a todo by id
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, progress } = req.body;

    const todo = await Todos.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title,
        progress,
        date: Date.now(),
      }
    );
    res.status(200).json({
      success: true,
      data: todo,
      message: "Update Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server error",
    });
  }
};

// Delete a todo by id
exports.deleteTodo = async (req, res) => {
  try {
    // Extract the id of the todo from the request body
    const { id } = req.params;

    // Find the todo by id and delete it
    const todo = await Todos.findOneAndDelete(id);

    // Return the deleted todo in the response
    return res
      .status(200)
      .json({ success: true, data: todo, message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({
      success: false,
      message: "Error in deleting todo. Please try again later",
      error: error.message,
    });
  }
};
