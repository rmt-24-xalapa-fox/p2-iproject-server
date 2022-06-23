const errorHandler = (err, req, res, next) => {
    let code = 500
    let msg = 'Internal Server Error'
    const { name } = err
    
    if (name === 'Error not found') {
        code = 404
        msg = 'Error Not Found'
    } else if (name === 'SequelizeValidationError' || name === 'SequelizeUniqueConstraintError') {
        code = 400
        msg = err.errors[0].message
    } else if (name === 'User not found') {
        code = 401
        msg = 'Invalid Email / Password'
    } else if (name === 'InvalidToken' || name === "JsonWebTokenError") {
        code = 401
        msg = "Access Token is Invalid"
    } else if (name === 'Forbidden') {
        code = 403
        msg = "You do not have access"
    } else if (name === 'BadRequest') {
        code = 400
        msg = "Params Id Must Be Number"
    } else if (name === 'notCustomer') {
        code = 403
        msg = "You are not a customer"
    } else if (name === 'Barber is already in favorites') {
        code = 400
        msg = "Barber is already in favorites"
    }
    res.status(code).json({
        statusCode: code,
        error: {
            message: msg,
        },
    })
}

module.exports = errorHandler