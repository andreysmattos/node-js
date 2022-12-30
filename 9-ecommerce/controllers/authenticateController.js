const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../Exceptions");
const User = require("../Models/User");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) throw new BadRequest("Email is already exists");

  const isFirstAccount = (await User.countDocuments({})) === 0;

  const role = isFirstAccount ? "admin" : "user";

  const user = new User({ name, email, password, role });
  await user.save();

  return res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  return res.send("Bah meo gurizin");
};

const logout = async (req, res) => {
  return res.send("Bah meo gurizin");
};

module.exports = {
  register,
  login,
  logout,
};
