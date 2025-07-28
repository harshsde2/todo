const mongoose = require("mongoose");

const todoCreateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date },
    priority: { type: Number, default: 3 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", todoCreateSchema);
