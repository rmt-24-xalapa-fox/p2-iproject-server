function errorHandler(err, req, res, next) {
  let code = 500;
  let msg = "Internal server error";
  console.log(err);

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400;
    msg = err.errors[0].message;
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    msg = "Invalid token";
  } else if (err.msg) {
    code = err.code;
    msg = err.msg;
  }

  res.status(code).json({
    message: msg,
  });
}

module.exports = errorHandler;
