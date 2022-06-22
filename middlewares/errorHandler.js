const errorHandler = (err, req, res, next)=>{
    let code = 500
    let msg = "Internal Server Error"
    
    if(err.message==='Invalid email/password'){
        code = 401
        msg = 'Invalid email/password'
    }else if(err.message==='InvalidToken'){
        code = 401
        msg = 'InvalidToken'
    }else if(err.name==='Forbidden error'||err.name==='Invalid User'){
        code = 403
        msg = 'Forbidden'
    }else if(err.name==='Validation error'||err.name==='SequelizeValidationError' ||err.name==='SequelizeDatabaseError' ){
        code = 400
        msg = 'Validation Error'
    }else if(err.message==='Data not found'){
        code = 404
        msg = 'Not Found'
    }
    res.status(code).json({
        status: 'Failed',
        code: code,
        message: msg
    })
}

module.exports = errorHandler