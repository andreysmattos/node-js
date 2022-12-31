const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unanthenticated } = require("../Exceptions");
const User = require("../Models/User");
const jwt = require("../utils/jwt");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) throw new BadRequest("Email is already exists");

  const isFirstAccount = (await User.countDocuments({})) === 0;

  const role = isFirstAccount ? "admin" : "user";

  const user = new User({ name, email, password, role });
  await user.save();

  const tokenUser = { name: user.name, id: user._id, role: user.role };
  jwt.attachCookiesToResponse(res, tokenUser);

  return res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log({ email, password });

  if (!email || !password)
    throw new BadRequest("Please provide email and password");

  const user = await User.findOne({ email });

  if (!user) throw new Unanthenticated("User does not exists");

  if (!(await user.attempt(password)))
    throw new Unanthenticated("User does not exists.");

  const tokenUser = { name: user.name, id: user._id, role: user.role };
  jwt.attachCookiesToResponse(res, tokenUser);

  return res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });

  return res.status(StatusCodes.OK).json({});
};

module.exports = {
  register,
  login,
  logout,
};
