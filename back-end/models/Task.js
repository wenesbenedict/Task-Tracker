const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending"
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Task", TaskSchema);