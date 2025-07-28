const express = require("express");
const router = express.Router();

const {
  createTodo,
  getUserTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");
const {
  createTodoValidators,
  getAllTodoValidators,
  updateTodoValidators,
} = require("../validators/todoValidator");
const validate = require("../validators/validate");

router.post("/createTodo", createTodoValidators, validate, createTodo);
router.patch("/updateTodo", updateTodoValidators, validate, updateTodo);
router.post("/getAllUserTodos", getAllTodoValidators, validate, getUserTodo);
router.delete("/delete/:id", deleteTodo);

module.exports = router;
