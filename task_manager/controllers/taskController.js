const Task = require("../models/task");

const asyncWrapper = require("../middleware/async");

const index = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  return res.status(200).json({ tasks, amount: tasks.length });
});

const store = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  return res.status(201).json({ task });
});

const show = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskId}` });
  }

  return res.status(200).json({ task });
});

const update = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskId}` });
  }

  return res.status(200).json({ task });
});

const destroy = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });

  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskId}` });
  }

  return res.status(200).json({ task });
});

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};
