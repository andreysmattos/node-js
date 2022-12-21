const { BadRequestError } = require("../errors");

const testUser = (req, res, next) => {
  if (req.auth._id == "63a0e6e535546ed26c4d00bb") {
    throw new BadRequestError(
      "Test user only allowd to perform read operations"
    );
  }

  return next();
};

module.exports = testUser;
