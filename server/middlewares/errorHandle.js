const errorHandler = (err, req, res, next) => {
  console.log(err);
  const { name, errors } = err;
  let statusCode = 500;
  let message = "Internal Server Error";

  if (
    name === "SequelizeValidationError" ||
    name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400;
    message = errors.map(({ message }) => message);
  } else if (name === "Email/PasswordEmpty") {
    statusCode = 400;
    message = "Email / Password is required";
  } else if (name === "UserNotFound") {
    statusCode = 401;
    message = "Invalid email/password";
  } else if (name === "MountainNotFound") {
    statusCode = 404;
    message = "Mountain Not Found";
  } else if (name === "invalidToken" || name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Access Token is Invalid";
  }

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
