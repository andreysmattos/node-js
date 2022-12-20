const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  const token = await user.generateJwt();

  return res.send({
    user: {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      token,
    },
  });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  const user_id = req.auth._id;

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const result = await User.findOneAndUpdate(
    { _id: user_id },
    { email, name, lastName, location }
  );

  const token = await result.generateJwt();

  return res.send({
    user: {
      name,
      lastName,
      location,
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("Please provide email and password");

  const user = await User.findOne({ email: email });
  if (!user) throw new UnauthenticatedError("Invalid credentials");

  const attempt = await user.attempt(password);
  if (!attempt) throw new UnauthenticatedError("Invalid credentials");

  const token = await user.generateJwt();

  return res.status(StatusCodes.OK).send({
    user: {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      token,
    },
  });
};

module.exports = { login, register, updateUser };
