const jwt = require("jsonwebtoken");
// const customError = require("../errors/custom-error");
const { UnantheticatedError } = require("../errors");

const authMiddleware = async (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnantheticatedError("Must provide header authorization.");
  }

  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    throw new UnantheticatedError("Must provide a valid header authorization.");
  }

  let user = {};

  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } catch (error) {
    console.log(error);
    throw new UnantheticatedError("Must provide a valid token.");
  }

  next();
};

module.exports = authMiddleware;
