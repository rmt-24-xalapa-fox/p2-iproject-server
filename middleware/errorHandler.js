const errorHandler = (err, req, res, next) => {  
  // default
  let code = 500  
  let message = "Internal Server Error"

  // console.log("error name:", err.name);
  // console.log(err);
  
  switch (err.name) {
    case 'SequelizeValidationError':
      code = 400;
      const errors = []
      err.errors.forEach(e => {
        errors.push(e.message)
      });
      message = errors.join('. \n')
      break;

    case 'SequelizeUniqueConstraintError':
      code = 400;
      message = 'Email already used'
      break;

    case 'ErrorBadRequest':
      code = 400;
      message = err.msg
      break;

    case 'SequelizeForeignKeyConstraintError':
      code = 404;
      message = 'Movie not found'
      break;

    case 'ErrorNotFound':
      code = 404;
      message = err.msg
      break;

    case 'ErrorUnauthorized':
    case 'ErrorInvalidToken':
      code = 401;
      message = err.msg
      break;      
    
    case 'ErrorForbidden':
    case 'ErrorUnauthorized':
      code = 403;
      message = err.msg
      break;

    case 'ErrorAlreadyExist':
      code = 400;
      message = err.msg
      break;

    // case ' ':

    //   break;
    default:
      break;
  }

  // console.log("code",code,"msg", message);

  res.status(code).json(message)
}

module.exports = errorHandler