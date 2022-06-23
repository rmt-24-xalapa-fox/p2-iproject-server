function errorHandler(err, req, res, next) {
  let code = 500;
  let message = "internal server error";

  if (err.name === "Invalid Token" || err.name === "JsonWebTokenError") {
    code = 400;
    message = "Access token received is invalid";
  }

  res.status(code).json({
    message,
  });
}

module.exports = errorHandler;
