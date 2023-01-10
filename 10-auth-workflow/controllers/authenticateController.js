const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unanthenticated, NotFound } = require("../Exceptions");
const User = require("../Models/User");
const jwt = require("../utils/jwt");
const createUserToToken = require("../utils/createUserToToken");
const crypto = require("crypto");
const Unauthenticated = require("../Exceptions/Unanthenticated");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) throw new BadRequest("Email is already exists");

  const isFirstAccount = (await User.countDocuments({})) === 0;

  const role = isFirstAccount ? "admin" : "user";

  const verification_token = crypto.randomBytes(40).toString("hex");

  const user = new User({
    name,
    email,
    password,
    role,
    verification_token,
  });
  await user.save();

  //temporary send token
  return res.status(StatusCodes.OK).json({
    msg: "Success! Please check your email to verify account",
    token: user.verification_token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequest("Please provide email and password");

  const user = await User.findOne({ email });

  if (!user) throw new Unanthenticated("User does not exists");

  if (!(await user.attempt(password)))
    throw new Unanthenticated("User does not exists.");

  if (!user.is_verified) throw new Unanthenticated("Please verify your email.");

  const userToToken = createUserToToken(user);
  jwt.attachCookiesToResponse(res, userToToken);

  return res.status(StatusCodes.OK).json({ user: userToToken });
};

const logout = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });

  return res.status(StatusCodes.OK).json({});
};

const verifyEmail = async (req, res) => {
  const { verification_token, email } = req.body;

  console.log({ verification_token, email });

  if (!verification_token || !email) throw new NotFound("");

  const user = await User.findOne({ email });
  if (!user) throw new BadRequest();

  console.log(user);
  console.log(user.verification_token);
  console.log(verification_token);

  if (user.verification_token !== verification_token)
    throw new Unauthenticated();

  user.verify = true;
  user.verified_at = new Date();

  user.verification_token = null;

  await user.save();

  return res.status(StatusCodes.OK).json({ msg: "E-mail verified" });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
};
