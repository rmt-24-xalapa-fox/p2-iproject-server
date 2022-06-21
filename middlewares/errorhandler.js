"use strict";

const errorHandler = (err, req, res, next) => {
    let { code, name } = err;
    let message = null;

    if (name === "SequelizeValidationError") {
        code = 400;
        message = err.message.split(",");
    } else if (name === "SequelizeUniqueConstraintError") {
        code = 401;
        message = "E-mail already exists within our database. please try logging in or use another E-mail.";
    } else if (name === "invalid access token") {
        code = 401;
        message = name;
    } else {
        switch (code) {
            case 400:
                message = "Bad request";
                break;
            case 401:
                message = "Unauthorized";
                break;
            case 403:
                message = "Forbidden";
                break;
            case 404:
                message = "Not Found";
                break;
        }
    }
    if (!code) {
        code = 500;
        message = "Internal Server Error";
    }

    res.status(code).json({
        statusCode: code,
        message: message,
    });
};

module.exports = errorHandler;
