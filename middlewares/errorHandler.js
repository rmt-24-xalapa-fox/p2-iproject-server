const errorHandler = async (err, req, res, next) => {
    const { name } = err;
    let code = 500;
    let message = "Internal Server Error";
  
    if (name === "USER_NOT_FOUND") {
      code = 401;
      message = "Invalid email/password";
    } else if (name === "SequelizeValidationError") {
      code = 400;
      message = err.errors.map((el) => el.message);
    } else if (name === "INVALID_TOKEN" || name === "JsonWebTokenError") {
      code = 401;
      message = "Invalid Token";
    }
  
    res.status(code).json({
      message,
    });
  };
  
  module.exports = errorHandler;
  