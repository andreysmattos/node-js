const UnantheticatedError = require("./unantheticated");
const BadRequest = require("./bad-request");
const CustomAPIError = require("./custom-error");

module.exports = {
  UnantheticatedError,
  BadRequest,
  CustomAPIError,
};
