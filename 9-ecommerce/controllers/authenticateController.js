const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unanthenticated } = require("../Exceptions");
const User = require("../Models/User");
const jwt = require("../utils/jwt");
const createUserToToken = require("../utils/createUserToToken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) throw new BadRequest("Email is already exists");

  const isFirstAccount = (await User.countDocuments({})) === 0;

  const role = isFirstAccount ? "admin" : "user";

  const user = new User({ name, email, password, role });
  await user.save();

  const userToToken = createUserToToken(user);
  jwt.attachCookiesToResponse(res, userToToken);

  return res.status(StatusCodes.CREATED).json({ user: userToToken });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequest("Please provide email and password");

  const user = await User.findOne({ email });

  if (!user) throw new Unanthenticated("User does not exists");

  if (!(await user.attempt(password)))
    throw new Unanthenticated("User does not exists.");

  const userToToken = createUserToToken(user);
  jwt.attachCookiesToResponse(res, userToToken);

  return res.status(StatusCodes.OK).json({ user: userToToken });
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
