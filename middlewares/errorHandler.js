"use strict"

const errorHandler = (err, req, res, next) => {
     const {name} = err
     let code = 500
     let msg = "Internal Server Error"


    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
        code = 400
        msg =  err.errors.map(error => error.message).join(", ")
    }
    
    if(err.name === "Bad Request"){
        code = 400
        msg =  "Params Id must number/integer"
    }

    if(err.name === "Invalid email or password"){
        code = 401
        msg =  "Invalid email or password"
    }
    
    if(err.name === "InvalidToken" || err.name === "JsonWebTokenError"){
        code = 401
        msg =  "Unauthorized"
    }
    
    if(err.name === "Forbidden"){
        code = 403
        msg =  "Don't have any permissions"
    }

    if(err.name === "Data not found"){
        code = 404
        msg =  "Data not found"
    }

    if(err.name === "Movie alredy in list"){
        code = 404
        msg =  "Movie alredy in list"
    }

    res.status(code).json({
        statusCode: code,
        message: msg
    })
}



module.exports = errorHandler