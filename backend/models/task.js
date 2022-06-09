const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  description: { type: String, required: true },
  creationDate: { type: Date, required: true },
  status: { type: Boolean, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
