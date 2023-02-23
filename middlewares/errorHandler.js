const errorHandler = (err, req, res, next) => {
    console.log(err);
    const { name } = err;

    let code = 500;
    let message = "Error";

    switch (name) {
        case "email/password required":
            // case "SequelizeValidationError":
            code = 400;
            message = "Bad Request";
            break;
        // case "Invalid Token":
        //     code = 400;
        //     message = "You don't have access";
        //     break;
        case "Rentalan not found":
            code = 404;
            message = "Rentalan not found";
            break
        // case "Wrong id":
        // case "No Product Updated":
        // case "No Product Deleted":
        //     code = 404;
        //     message = "error not found";
        //     break;
        // case "Invalid email/password":
        // case "Invalid username/password":
        // case "JsonWebTokenError":
        //     code = 401;
        //     message = "Invalid email/password";
        //     break;
        // case "Forbidden":
        //     code = 403;
        //     message = "You don't have access";
        //     break;
    }

    res.status(code).json({
        statusCode: code,
        message: message,
    });
};

module.exports = errorHandler;
