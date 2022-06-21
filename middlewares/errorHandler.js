const errorHandler = ((err, req, res, next) => {
    console.log(err);
    let code = 500;
    let msg = "Internal Server Error";

    const { name } = err

    if (name === "SequelizeValidationError") {
      code = 400;
      msg = err.errors.map((el) => el.message);
    } else if (name === "SequelizeUniqueConstraintError") {
      code = 400;
      msg = err.errors.map((el) => el.message);
    } else if (name === "RegistrationFailed") {
      code = 400;
      msg = "Registration Failed";
    } else if (name === "UserNotFound") {
      code = 401;
      msg = "Unauthorized Access";
    } else if (name === "InvalidPassword") {
      code = 401;
      msg = "Invalid Password/Email";
    } else if (name === "Product_not_found") {
      code = 404;
      msg = "Product Not Found";
    } else if (name === "InvalidToken" || name === "JsonWebTokenError") {
      code = 401;
      msg = "Access Token is Invalid";
    } else if (name === "BadRequest") {
      code = 400;
      msg = "Bad Request";
    } else if (name === "Forbidden") {
      code = 403;
      msg = "You Don't Have Access!";
    }

    res.status(code).json({
      statusCode: code,
      error: {
        message: msg,
      },
    });
})



module.exports = errorHandler