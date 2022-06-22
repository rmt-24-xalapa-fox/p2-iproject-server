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

  res.status(code).json({
    msg,
    error,
  });
}

module.exports = handleError;
