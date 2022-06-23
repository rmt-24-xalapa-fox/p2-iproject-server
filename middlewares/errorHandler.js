"use strict";

const errorHandler = (err, req, res, next) => {
  const { name } = err;
  let code = 500;
  let msg = err.name

  if(!err.name){
    msg = err;
  }

  if (err.name === `id_not_found`) {
    code = 404;
    msg = `News not found`;
  }
  if (err.name === `InvalidToken`|| err.name === `JsonWebTokenError`) {
    code = 401;
    msg = `Access token invalid`;
  }
  if (err.name === "UserNotFound") {
    console.log('22222')
    code = 401;
    msg = `Error user not found or password not matched`;
  }
  if (err.name === "SequelizeValidationError") {
    code = 400;
    let str = ``
    err.errors.forEach(el => {
      str+= el.message +`\n`
    });
    msg = str
    console.log(err.errors)
    // msg = 'slebew'
  }
  if (err.name === "NotFound") {
    code = 404;
    msg = `News not found`;
  }
  if (err.name === "BadRequest") {
    code = 400;
    msg = `Params id must be integer number`;
  }

  if(err.name==='NotFound'){
    code = 404
    msg = `News Not Found`
  }

  if(err.name==='Forbidden'){
    code = 403
    msg = `You are not authorized for this function`
  }
  
  
  if(err.name==='Status Bad Request'){
    code = 400
    msg = `Status must either be "active", "inactive" or "archived"`
  }

  if(err.name==='bookmark_already_exist'){
    code = 409
    msg = `Bookmark Already Exist`
  }
  if(err.name==='SequelizeUniqueConstraintError'){
    code = 400
    msg = `Email already taken`
  }
  if(err.name==='notCustomer'){
    code = 403
    msg = `Role must be customer to access this`
  }

  console.log(err.name)


  res.status(code).json({
    statusCode: code,
    error: {
      message: msg,
    },
  });
};

module.exports = errorHandler;
