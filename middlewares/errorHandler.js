const errorHandler = (err, req, res, next) => {
  let code = 500;
  let msg = "Internal Server Error";

  // console.log(err.name);

  if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeValidationError"
  ) {
    code = 400;
    msg = err.errors[0].message;
  } else if (
    err.name === "SequelizeForeignKeyConstraintError" ||
    err.name === "ForeignKeyNotValid"
  ) {
    code = 400;
    msg = "the choosen category is not valid";
  } else if (err.name === "BadRequest") {
    code = 400;
    msg = "Email and Password is required";
  } else if (err.name === "ParamsNotValid") {
    code = 400;
    msg = "Params must be an integer number";
  } else if (err.name === "InvalidCredential") {
    code = 401;
    msg = "Invalid Email / Password";
  } else if (err.name === "InvalidToken" || err.name === "JsonWebTokenError") {
    code = 401;
    msg = "Access Token is invalid";
  } else if (err.name === "Forbidden") {
    code = 403;
    msg = "You do not have access";
  } else if (err.name === "idNotFound") {
    code = 404;
    msg = "product with that id cannot be found";
  } else if (err.name === "wishlistNotFound") {
    code = 404;
    msg = "product with that id is not on your wishlist";
  }

  res.status(code).json({
    statusCode: code,
    error: {
      message: msg,
    },
  });
};

module.exports = errorHandler;
