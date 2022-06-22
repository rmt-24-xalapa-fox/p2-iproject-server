"use strict";

const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = err;

  if (
    err.name === `SequelizeValidationError` ||
    err.name === `SequelizeUniqueConstraintError` ||
    err === "BadRequest"
  ) {
    code = 400;
    message = err.errors.map(el => el.message);
  } else if (err.message === `Id not found` || err.name === `Error`) {
    code = 404;
    message = `Error not found`;
  } else if (err === "Forbidden") {
    (code = 403), (message = "You do not have access");
  }

  res.status(code).json({
    statusCode: code,
    error: {
      message: message
    }
  });
};

module.exports = errorHandler;
