function handleError(err, req, res, next) {
  let code = null;
  let message = null;

  switch (err.name) {
    case "SequelizeValidationError":
      code = 400;
      message = {};
      err.errors.map((el) => {
        message["message"] = el.message;
      });
      break;

    case "SequelizeUniqueConstraintError":
      code = 400;
      message = { message: "Email must be unique" };
      break;

    case "Transaction failed":
      code = 401;
      message = { message: "Transaction failed" };
      break;

    case "JsonWebTokenError":
      code = 401;
      message = { message: "Invalid token" };
      break;

    case "Email is required":
      code = 400;
      message = { message: "Email is required" };
      break;

    case "Name is required":
      code = 400;
      message = { message: "Name is required" };
      break;

    case "Password is required":
      code = 400;
      message = { message: "Password is required" };
      break;

    case "Status is required":
      code = 400;
      message = { message: "Status is required" };
      break;

    case "Invalid token":
      code = 401;
      message = { message: "Invalid token" };
      break;

    case "Songs not found":
      code = 404;
      message = { message: "Songs not found" };
      break;

    case "Radio station not found":
      code = 404;
      message = { message: "Radio station not found" };
      break;

    case "Invalid email/password":
      code = 401;
      message = { message: "Invalid email/password" };
      break;

    default:
      code = 500;
      message = "Internet Server Error";
      break;
  }

  res.status(code).json(message);
}

module.exports = {
  handleError,
};
