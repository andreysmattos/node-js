const { StatusCodes } = require('http-status-codes');
const Exception = require('./Exception');

class Unauthenticated extends Exception {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
