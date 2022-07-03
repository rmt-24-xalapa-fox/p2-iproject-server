"use strict"

function errorHandler(err, req, res, next) {
    console.log(err, "ini error");
    let code = 500;
    let msg = "Internal Server Error";

    if (err.name === "Email cannot be null") {
        code = 400;
        msg = err.name
    }
    if (err.name === "Password cannot be null") {
        code = 400;
        msg = err.name
    }
    if (err.name === "User not found") {
        code = 401;
        msg = err.name;
    }
    if (err.name === "Invalid email") {
        code = 401;
        msg = err.name;
    }
    if (err.name === "Invalid password") {
        code = 401;
        msg = err.name;
    } else if (err.name === "Invalid password") {
        code = 401;
        msg = err.message;
    } else if (err.message === "Product not found") {
        code = 400;
        msg = err.message;
    } else if (err.name === "JsonWebTokenError") {
        code = 401;
        msg = err.message;
    } else if (err.message === "Forbidden") {
        code = 403;
        msg = "You Dont Have Authorization";
    } else if (err.name === "SequelizeValidationError") {
        code = 400;
        let error = err.errors.map((el) => {
            return el.message;
        });
        msg = error[0];
    } else if (err.name === "SequelizeUniqueConstraintError") {
        code = 400;
        let error = err.errors.map((el) => {
            return el.message;
        });
        msg = error[0];
    } else if (err.name === 'Bad Request') {
        code = 404
        msg = 'Params must be an integer number'
    } else if (err.name === 'DataError not found') {
        code = 404
        msg = "Data Product not Found"
    }

    res.status(code).json({
        statusCode: code,
        message: msg,
    });
}

module.exports = errorHandler 