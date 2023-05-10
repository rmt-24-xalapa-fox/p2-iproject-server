function errorHandler(err, req, res, next) {
  //   console.log(err);
  let code = 500;
  let error = "Internal server error";
  let detail = [];
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    err.errors.forEach((el) => {
      detail.push(el.message);
    });
    error = "Invalid input";
  }

  if (err.name === "bad input") {
    code = 400;
    error = err.message;
  }

  if (err.name === "login fail") {
    code = 401;
    error = err.message;
  }

  if (err.name === "not found") {
    code = 404;
    error = err.message;
  }

  if (!detail[0]) {
    detail = "No details available";
  }
  res.status(code).json({ status: "error", error, detail });
}
module.exports = { errorHandler };
