const User = require("../Models/User");

const { StatusCodes } = require("http-status-codes");

const index = async (req, res) => {
  const users = await User.find({ role: "user" }, { password: 0 });

  res.status(StatusCodes.OK).json({ users });
};
const show = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }, { password: 0 });

  res.status(StatusCodes.OK).json({ user });
};
const updateCurrent = async (req, res) => {
  res.send("Bah meooo 3");
};
const updateCurrentPassword = async (req, res) => {
  res.send("Bah meooo 4");
};
const showCurrent = async (req, res) => {
  res.send("Bah meooo 5");
};

module.exports = {
  index,
  show,
  updateCurrent,
  updateCurrentPassword,
  showCurrent,
};
