const { body } = require("express-validator");

exports.createTodoValidators = [
  body("title").notEmpty().withMessage("title is required"),
];

exports.updateTodoValidators = [
  body("todoId").notEmpty().withMessage("todoId is required"),
  body("title").notEmpty().withMessage("title is required"),
];

exports.getAllTodoValidators = [];
