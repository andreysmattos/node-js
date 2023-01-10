const { StatusCodes } = require("http-status-codes");
const Exception = require("./Exception");

class Forbidden extends Exception {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = Forbidden;
