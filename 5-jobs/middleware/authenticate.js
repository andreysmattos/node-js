const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Invalid token");
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id).select("-password");

    if (!user) throw new UnauthenticatedError("Invalid token");

    req.auth = user;

    if (payload) return next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid token");
  }
};

module.exports = authenticate;
