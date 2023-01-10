const { Unanthenticated } = require("../Exceptions");

const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return true;
  if (requestUser._id.toString() === resourceUserId.toString()) return true;

  throw new Unanthenticated("You are not allowed");
};

module.exports = checkPermission;
