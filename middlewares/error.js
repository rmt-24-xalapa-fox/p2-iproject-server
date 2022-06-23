const errorHandler = (error, req, res, next) => {
    let message = "Undefined error";
    switch (error.name) {
        case "SequelizeValidationError":
        error.statusCode=400;
            message = error.message;
            break;
        case "JsonWebTokenError":
        error.statusCode=401;
            message = "Token invalid"
            break;
        case "INVALID_PASSWORD":
        error.statusCode=401;
            message = "Password invalid"
            break;
        case "INVALID_USERNAME":
        error.statusCode=401;
            message = "Email/Username invalid"
            break;
        case "SequelizeUniqueConstraintError":
        error.statusCode=401;
            message = "Data already exist"
            break;
    }
    if(message=="Undefined error"){
        switch (error.statusCode) {
            case 401:
                message = "Auth failed";
                break;
            case 404:
                message = "Not found"
                break;
            case 403:
                message = "Forbidden access"
                break;
            case 500:
                message = "Internal Server Error"
                break;
            default:
                error.statusCode=400;
                message=error.message;
                break;
        }
    }

    res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: message
    });

}

module.exports = errorHandler;