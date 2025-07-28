const Todo = require("../models/todoModels");

const createTodo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      title,
      description = "",
      completed = false,
      priority = 3,
      dueDate = new Date(),
      tags = [],
    } = req.body;

    const newTodo = await Todo.create({
      userId: userId,
      title: title.trim(),
      description: description.trim(),
      dueDate,
      completed,
      priority,
      tags: Array.isArray(tags) ? tags : [],
    });

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      todoId,
      title,
      description = "",
      completed = false,
      priority = 3,
      dueDate = new Date(),
      tags = [],
    } = req.body;

    const newTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        title,
        description,
        completed,
        priority,
        dueDate,
        tags,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      success: true,
      message: "Todo updated successfully",
      data: newTodo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getUserTodo = async (req, res) => {
  try {
    const { userId } = req.user;

    const allUserTodo = await Todo.find({ userId });

    if (allUserTodo.length == 0) {
      return res
        .status(404)
        .json({ status: false, message: "Data not Found!" });
    }

    res.status(200).json({
      status: true,
      message: "data fetch successfully",
      data: allUserTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("id =>", JSON. (id, null, 2));

    const deletedTodo = await Todo.findByIdAndDelete(id);

    // console.log("deletedTodo =>", JSON.stringify(deletedTodo, null, 2));

    if (!deletedTodo) {
      return res
        .status(404)
        .json({ status: false, message: "todo not Found!" });
    }

    res.status(200).json({
      status: true,
      message: "Todo Deleted successfully",
      data: deletedTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.createTodo = createTodo;
exports.getUserTodo = getUserTodo;
exports.deleteTodo = deleteTodo;
exports.updateTodo = updateTodo;
