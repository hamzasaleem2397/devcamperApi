const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // Log to console for dev
  console.log("error", error);

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Result not found with id of ${err.reason.BSONError}`;
    error = new ErrorResponse(message, 404);
  }
  //Mongoose duplicate kkey
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }
  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(
      (val) => val.message,
    );
    error = new ErrorResponse(message, 400);
    // console.log(err.errors.yellow);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "ServerError",
  });
};

module.exports = errorHandler;
