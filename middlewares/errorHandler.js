const errorHandler = ((err, req, res, next) => {
    // throw new Error => message
    console.log(err, "==> ini dari errorHandler");
    let code = 500
    let msg = "Internal Server Error"

    // FOOD CONTROLLER
    if (err.message === "FOOD_NOT_FOUND") {
        code = 404
        msg = "Food not found"
    }

    // AUTHORIZATION
    else if (err.message === "NOT_ALLOWED") {
        code = 403 
        msg = "Forbidden to access"
    } 

    // USER CONTROLLER
    else if (err.message === "REGISTRATION_FAILED") {
        code = 400
        msg = "Registration Failed"
    } 

    else if (err.message === "USER_NOT_FOUND") {
        code = 401
        msg = "Invalid (email / password)"
    }

     else if (err.message === "INVALID_PASSWORD") {
        code = 401
        msg = "Invalid (email / password)"
    }

    // AUTHENTICATION 
    else if (err.name === "JsonWebTokenError") {
        code = 401
        msg = "Please login or register"
    }

    else if (err.message === "INVALID_TOKEN") {
        code = 401
        msg = "Please login or register"
    }

    // Sequelize
    else if (err.name === "SequelizeValidationError") {
        code = 400;
        msg = err.errors[0].message
    }   

    else if (err.name === "SequelizeUniqueConstraintError") {
        code = 400;
        msg = err.errors[0].message
    } 

    // CUSTOMER
    else if (err.message === "FOOD_ALREADY_FAVORITE") {
        code = 400;
        msg = "Food already favorite"    
    }

    else if (err.message === "CUSTOMER_NOT_FOUND") {
        code = 403;
        msg = "Please login as customer"    
    }
    res.status(code).json({
        statusCode: code,
        error: {
            message: msg
        },
    })                          
})

module.exports = errorHandler  