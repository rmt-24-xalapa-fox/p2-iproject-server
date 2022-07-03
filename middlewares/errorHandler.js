const errorHandler = (err, req, res, next) => {
    console.log(err);
    const { name } = err;

    let code = 500;
    let message = "Error";

    switch (name) {
        case "password is required":
            code = 400;
            message = "password is required";
            break;
        case 'email is requrired':
            code = 400;
            message = 'email is requrired';
            break
        case "SequelizeValidationError":
            code = 400;
            message = "invalid email format"
            break;
        case "SequelizeUniqueConstraintError":
            code = 400;
            message = "email must be unique"
            break;
        case "email/password invalid":
            code = 400;
            message = "email/password invalid"
            break;
        case 'Not found Unit':
            code = 403;
            message = 'Not found Unit'
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
