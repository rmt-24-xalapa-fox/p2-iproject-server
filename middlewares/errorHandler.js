function errorHandler(err, req, res, next) {
  let code = 500;
  let msg = "Internal Server Error";
  const { name } = err;
  if (name === "SequelizeValidationError") {
    code = 400;
    msg = err.errors.map((error) => error.message);
  } else if (
    name === `Email can't be empty` ||
    name === `Password can't be empty`
  ) {
    code = 400;
    msg = name;
  } else if (name === "Invalid email/password") {
    code = 401;
    msg = "Invalid email/password";
  } else if (name === "Palette not found") {
    code = 404;
    msg = name;
  } else if (name === "InvalidToken" || name === "JsonWebTokenError") {
    code = 401;
    msg = "Invalid token";
  } else if (name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = "Email must be unique";
  } else if (name === "Color palettes has reached the limit") {
    code = 403;
    msg = name;
  } else if (name === "Forbidden") {
    code = 403;
    msg = `You Don't Have Access`;
  } else if (name === "Your account is already premium") {
    code = 403;
    msg = name;
  } else if (name === "MidtransError") {
    const transactionIdUsed =
      err.ApiResponse.error_messages[0] ===
      "transaction_details.order_id sudah digunakan";
    if (transactionIdUsed) {
      code = 403;
      msg = "Your account is already premium";
    }
  }

  res.status(code).json({
    statusCode: code,
    error: {
      message: msg,
    },
  });
}

module.exports = errorHandler;
