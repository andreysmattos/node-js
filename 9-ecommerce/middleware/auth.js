const { Unanthenticated, Forbidden } = require("../Exceptions");
const User = require("../Models/User");
const jwt = require("../utils/jwt");

const auth = async (req, res, next) => {
  const { token } = req.signedCookies;
  if (!token) throw new Unanthenticated("Provide token");

  try {
    const payload = jwt.verify(token);
    const user = await User.findOne({ _id: payload.id }, { password: 0 });
    if (!user) throw new Unanthenticated("User is not valid");

    req.user = user;

    console.log({ user });
    next();
  } catch (error) {
    throw new Unanthenticated("Provide a valid token");
  }
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Forbidden("Unauthorized to access this route.");
    }
    return next();
  };
};

module.exports = { auth, hasRole };
