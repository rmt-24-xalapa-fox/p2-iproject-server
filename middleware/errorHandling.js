
const errorHandling = (err, req, res, next) => {
    // console.log(err.message);
    console.log(err);
    let code = 500
    let msg = `Internal Server Error`

    if (err.name == "SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError") {
        let errorz = []
        code = 400
        msg = err.errors[0].message
    } else if (err.message == "NOT_FOUND") {
        code = 404
        msg = `Data is not found`
    } else if (err.message == "passwordsalah") {
        code = 401
        msg = 'wrong email or password'
    } else if (err.name == "JsonWebTokenError") {
        code = 401
        msg = 'Token Unauthenticated'
    } else if (err.message == "NOT_ALLOWED") {
        code = 403
        msg = 'Forbidden to Access'
    } else if (err.message == `Email_nf`) {
        code = 404
        msg = `email is not found`
    } else if (err.message == `already`) {
        code = 400
        msg = `Data is already in wishlist`
    }

    res.status(code).json({
        statusCode: code,
        error: {
            message: msg
        }
    })
}

module.exports = { errorHandling }