const { BadRequest, Unanthenticated } = require("../Exceptions");
const jwt = require("../utils/jwt");
const createUserToToken = require("../utils/createUserToToken");
const User = require("../Models/User");

const { StatusCodes } = require("http-status-codes");
const checkPermission = require("../utils/checkPermission");

const index = async (req, res) => {
  const users = await User.find({ role: "user" }, { password: 0 });

  res.status(StatusCodes.OK).json({ users });
};
const show = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }, { password: 0 });

  checkPermission(req.user, user._id);

  res.status(StatusCodes.OK).json({ user });
};
const updateCurrent = async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { email, name },
      { new: true, runValidators: true }
    );

    const userToToken = createUserToToken(user);
    jwt.attachCookiesToResponse(res, userToToken);

    return res.status(StatusCodes.OK).json({ user: userToToken });
  } catch (error) {
    console.log(error);
  }
};
const updateCurrentPassword = async (req, res) => {
  const { old_password, new_password } = req.body;

  if (!old_password || !new_password)
    throw new BadRequest("Please provide old_password and new_password");

  const user = await User.findOne({ _id: req.user._id });

  if (!(await user.attempt(old_password)))
    throw new Unanthenticated("Invalid Credentials");

  try {
    user.password = new_password;
    user.save();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({});
  }

  return res.status(StatusCodes.OK).json({});
};
const showCurrent = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

module.exports = {
  index,
  show,
  updateCurrent,
  updateCurrentPassword,
  showCurrent,
};
