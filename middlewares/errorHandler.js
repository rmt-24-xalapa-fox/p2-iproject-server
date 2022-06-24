const errorHandler = (err, req, res, next) => {
  const { name } = err;
  let code = 500;
  let message = "Internal Server Error";

  if (name == "SequelizeValidationError") {
    code = 400;
    message = err.errors.map((error) => error.message).join(", ");
  }

  if (name === "SequelizeUniqueConstraintError") {
    code = 400;
    message = err.errors.map((error) => error.message).join(", ");
  }
  //

  if (name == "BAD REQUEST") {
    code = 400;
    message = "Params must be Number";
  }

  if (name === "INVALID TOKEN" || name === "JsonWebTokenError") {
    code = 401;
    message = "Access Token is Invalid";
  }

  if (name === "USER NOT FOUND") {
    code = 401;
    message = "Invalid email or password";
  }

  if (name === "Data not found") {
    code = 401;
    message = "Data not found";
  }

  if (name === "FORBIDDEN") {
    code = 403;
    message = "You dont have access";
  }

  if (name === "error not found") {
    code = 404;
    message = "Data Not Found";
  }

  if (name === "Not Acceptable") {
    code = 406;
    message = "Data Already Exists";
  }

  res.status(code).json({
    status: "Failed",
    code,
    message,
  });
};

module.exports = errorHandler;
