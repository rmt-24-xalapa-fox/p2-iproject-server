const errorHandler = (err, req, res, next) => {
  const { name, errors } = err;
  console.log(name, errors);
  let statusCode = 500;
  let message = "Internal Server Error";

  if (
    name === "SequelizeValidationError" ||
    name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400;
    message = errors.map(({ message }) => message);
  }

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
