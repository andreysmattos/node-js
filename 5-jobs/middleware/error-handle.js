const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  // set defaults
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later.",
  };

  if (err.name === "ValidationError") {
    customError.message = err.message;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate ${Object.keys(
      err.keyValue
    )} fields. please choose another value.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name && err.name === "CastError") {
    customError.message = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  // return res.json(err);

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;
