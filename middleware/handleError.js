"use strict";
function handleError(err, req, res, next) {
  let code = 500;
  let msg = "Internal Server Error";
  let error = err;

  if (err.name === "SequelizeValidationError") {
    code = 400;
    msg = "bad request";
    error = err.errors.map((el) => el.message);
  }

  if (err.name === "SequelizeDatabaseError") {
    code = 400;
    msg = "database error";
  }

  if (err.name === "Invalid Token") {
    code = 401;
    msg = "unauthorized";
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    code = 403;
    msg = "Forbidden";
    error = err.errors.map((el) => el.message);
  }

  if (err.name === "Not found") {
    code = 404;
    msg = "can not find requested";
  }

  if (err.name === "invalid email/password") {
    code = 401;
    msg = "unauthorized";
  }

  res.status(code).json({
    msg,
    error,
  });
}

module.exports = handleError;
