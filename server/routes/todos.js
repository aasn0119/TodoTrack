const express = require("express");
const router = express.Router();

//import controller
const {
  createTodo,
  getTodos,
  getTodoByMail,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

//define routes
router.post("/createTodo", createTodo);
router.get("/getTodos", getTodos);
router.get("/getTodos/:user_email", getTodoByMail);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;
