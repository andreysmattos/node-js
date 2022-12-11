const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  const token = await user.generateJwt();

  return res.send({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) throw new UnauthenticatedError("Invalid credentials");

  const attempt = await user.attempt(password);
  if (!attempt) throw new UnauthenticatedError("Invalid credentials");

  const token = await user.generateJwt();

  return res.status(StatusCodes.OK).send({ token: token });
};

module.exports = { login, register };
