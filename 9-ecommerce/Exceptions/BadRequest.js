const { StatusCodes } = require("http-status-codes");
const Exception = require("./Exception");

class BadRequest extends Exception {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
