const errorHandler = (err, req, res, next) => {
    // console.log(err);
    let errors;
    let code;
    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            errors = err.errors[0].message;
            res.status(400).json({ message: errors });
            break;
        case "Email_is_Required":
            errors = err.message;
            code = err.code;
            res.status(code).json({ message: errors });
            break;
        case "Password_is_Required":
            errors = err.message;
            code = err.code;
            res.status(code).json({ message: errors });
            break;
        case "User_Not_Found":
            errors = err.message;
            code = err.code;
            res.status(code).json({ message: errors });
            break;
        case "Not_Found":
            errors = err.message;
            code = err.code;
            res.status(code).json({ message: errors });
            break;
        case "Forbidden_Duplicate":
            errors = err.message;
            code = err.code;
            res.status(code).json({ message: errors });
            break;
        case "Forbidden_Access":
            errors = err.message;
            code = err.code;
            res.status(code).json({ message: errors });
            break;
        case "JsonWebTokenError":
            res.status(401).json({ message: "Invalid Token" });
            break;
        default:
            res.status(500).json({ message: "Internal server error" });
            break;
    }
};

module.exports = errorHandler;