function errorHandler(err, req, res, next) {
  let code = 500;
  let message = "internal server error";

  res.status(code).json({
    message,
  });
}

module.exports = errorHandler;
