const { tokenToPayload } = require("../helpers/jwt");
const { User,Post } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const {access_token} = req.headers;
    const payload = tokenToPayload(access_token);
    console.log(payload);
    const userFound = await User.findByPk(payload.id);

    if (!userFound) {
      throw { statusCode: 401 };
    } else {
      req.user = {
        id: userFound.id,
        email: userFound.email,
        role: userFound.role
      };
    }
    next();
  } catch (err) {
    next(err);
  }
};
const authorizationUser = async (req, res, next) => {
  try {
   if(req.user){
    // const id = req.params.id;
    // console.log(id+" this is id")
    // let movie =  await Movie.findByPk(id, {});
    // if(movie){

      // console.log("Movie search ended");
      if (req.user.role !== "customer") {
          throw { statusCode: 403 };
        } else {
          next();
        }
      }else{
        throw { statusCode: 404 };
      }
    
   
  //  }else{
  //   throw {statusCode: 401}
  //  }
  } catch (err) {
    next(err);
  }
};

const authorization = async (req, res, next) => {
  try {
   if(req.user){
    // const id = req.params.id;
    // console.log(id+" this is id")
    // let movie =  await Movie.findByPk(id, {});
    // if(movie){

      // console.log("Movie search ended");
      if (req.user.role !== "admin") {
          throw { statusCode: 403 };
        } else {
          next();
        }
      }else{
        throw { statusCode: 404 };
      }
    
   
  //  }else{
  //   throw {statusCode: 401}
  //  }
  } catch (err) {
    next(err);
  }
};

module.exports = {authentication,authorization,authorizationUser};