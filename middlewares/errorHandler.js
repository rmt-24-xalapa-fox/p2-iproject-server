"use strict";

const errorHandler = (err, req, res, next) => {
  let { name, errors } = err;
  let code = 500;
  let msg = err;

  if (name === "UserNotFound" || name === "WrongPassword") {
    code = 401;
    msg = "Wrong Username / Password";
  } else if (name === "SequelizeValidationError") {
    code = 400;
    msg = errors[0].message;
  } else if (name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = errors[0].message;
  } else if (name === "eventNotFound") {
    code = 404;
    msg = "Food not found";
  } else if (name === "InvalidToken" || name === "JsonWebTokenError") {
    code = 401;
    msg = "Access token invalid";
  } else if (name === "Forbidden") {
    code = 403;
    msg = "You do not have access";
  } else if (name === "InvalidParams") {
    code = 400;
    msg = "Params id must be integer";
  } else if (name === "EmptyField") {
    code = 400;
    msg = "Empty Username / Password";
  } else if (name === "exist") {
    code = 400;
    msg = "Double request";
  } else {
    name = "Internal Server Error";
    code = 500;
    msg = errors;
  }

  res.status(code).json({
    name,
    message: msg,
  });
};

module.exports = errorHandler;
