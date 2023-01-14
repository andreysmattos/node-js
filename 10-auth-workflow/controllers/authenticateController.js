const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unanthenticated, NotFound } = require("../Exceptions");
const User = require("../Models/User");
const Token = require("../Models/Token");
const jwt = require("../utils/jwt");
const createUserToToken = require("../utils/createUserToToken");
const crypto = require("crypto");
const Unauthenticated = require("../Exceptions/Unanthenticated");
const verificationEmail = require("../mail/verificationEmail");
const resetPasswordEmail = require("../mail/resetPasswordEmail");

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

  const origin = "http://127.0.0.1:5000";

  await verificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verification_token,
    origin,
  });

  return res.status(StatusCodes.OK).json({
    msg: "Success! Please check your email to verify account",
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
  let refreshToken = "";

  const existingToken = await Token.findOne({ user_id: user._id });

  if (existingToken) {
    const { isValid } = existingToken;

    if (!isValid) throw new Unanthenticated();

    refreshToken = existingToken.refreshToken;
    jwt.attachCookiesToResponse(res, userToToken, refreshToken);
    return res.status(StatusCodes.OK).json({ user: userToToken });
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, userAgent, ip, user_id: user._id };
  await Token.create(userToken);

  console.log(userToken);

  jwt.attachCookiesToResponse(res, userToToken, refreshToken);

  return res.status(StatusCodes.OK).json({ user: userToToken });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user_id: req.user._id });

  res.cookie("acessToken", "", { httpOnly: true, expires: new Date(0) });
  res.cookie("refreshToken", "", { httpOnly: true, expires: new Date(0) });

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

  user.is_verified = true;
  user.verified_at = new Date();

  user.verification_token = null;

  await user.save();

  return res.status(StatusCodes.OK).json({ msg: "E-mail verified" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) throw new BadRequest("Provide valid email");

  const user = await User.findOne({ email });

  console.log({ user });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    // send email

    const origin = "http://127.0.0.1:5000";

    await resetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokemExpirationDate = new Date(Date.now() + tenMinutes);

    user.password_token = passwordToken;
    user.password_token_expiration = passwordTokemExpirationDate;

    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;

  if (!token || !email || !password)
    throw new BadRequest("Please provide all values");

  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    if (
      user.password_token === token &&
      user.password_token_expiration > currentDate
    ) {
      user.password = password;
      user.password_token = null;
      user.password_token_expiration = null;
      await user.save();
      console.log('deu');
    }
  }



  // console.log({ token, email, password });
  res.status(200).json({ msg: "reset password" });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
