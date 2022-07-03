"use strict";

const errorHandler = (err, req, res, next) => {
    let code = 500;
    let msg = "ISE";

    if (err.name === "Invalid Token" || err.name === "JsonWebTokenError") {
        code = 403;
        msg = "Invalid Token";
    }

    res.status(code).json({
        error: {
            message: err
        }
    });
};

module.exports = errorHandler;