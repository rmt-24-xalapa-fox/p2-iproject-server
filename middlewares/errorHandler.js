const errorHandler = (err, req, res, next) => {
  let code = 500;
  let msg = "Internal Server Error";

  if (err.name === "SequelizeValidationError") {
    code = 400;
    msg = err.errors.map((e) => e.message);
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = "The email has been taken by another user";
  }
  if (err.name === "PRODUCT_ALREADY_EXISTS") {
    code = 400;
    msg = "The product has been your wishlists all the time";
  }

  if (err.name === "USER_NOT_FOUND") {
    code = 401;
    msg = "Invalid Email and Password";
  }
  if (err.name === "PRODUCT_NOT_FOUND") {
    code = 404;
    msg = "Error Not Found";
  }
  if (err.name === "InvalidToken" || err.name === "JsonWebTokenError") {
    code = 401;
    msg = "You have to login first";
  }
  if (err.name === "FORBIDDEN") {
    code = 403;
    msg = "You do not have access";
  }
  if (err.name === "BAD_REQUEST") {
    code = 400;
    msg = "The id should be an integer number";
  }

  res.status(code).json({
    statusCode: code,
    message: msg,
  });
};

module.exports = errorHandler;
