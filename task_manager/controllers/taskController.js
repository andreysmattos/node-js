const Task = require("../models/task");

const index = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
};

const store = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

const show = async (req, res) => {
  const { id } = req.params;

  const task = await Task.find({ _id: id });
  res.status(200).json(task);
};

const update = async (req, res) => {
  const { id } = req.params;

  const task = await Task.updateOne({ _id: id }, req.body);

  res.status(200).json(task);
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const task = await Task.deleteOne({ _id: id });
  res.status(200).json();
};

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};
