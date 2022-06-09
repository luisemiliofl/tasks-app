const express = require("express");

const Task = require("../models/task");

const router = express.Router();

router.post("", (req, res, next) => {
  const task = new Task({
    description: req.body.description,
    creationDate: req.body.creationDate,
    status: false,
  });
  task.save().then((createdTask) => {
    res.status(201).json({
      message: "Task added successfully",
      task: createdTask,
    });
  });
});

router.put("/:id", (req, res, next) => {
  const task = new Task({
    _id: req.body.id,
    description: req.body.description,
    creationDate: req.body.creationDate,
    status: req.body.status,
  });
  Task.updateOne({ _id: req.params.id }, task).then((result) => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Task.find().then((documents) => {
    res.status(200).json({
      message: "Tasks fetched successfully!",
      tasks: documents,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Task.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Tasks deleted!" });
  });
});

module.exports = router;
