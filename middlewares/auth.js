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
const authorizationAdmin = async (req, res, next) => {
  try {
   if(req.user){
      if (req.user.role !== "admin") {
          throw { statusCode: 403 };
        } else {
          next();
        }
      }else{
        throw { statusCode: 404 };
      }
    
  } catch (err) {
    next(err);
  }
};

const authorizationPost = async (req, res, next) => {
  try {
   if(req.user){
      if (req.user.role !== "admin") {
          throw { statusCode: 403 };
        } else {
          next();
        }
      }else{
        throw { statusCode: 404 };
      }
  } catch (err) {
    next(err);
  }
};

const authorizationPayment = async (req, res, next) => {
  try {
   if(req.user){
      if (req.user.role !== "admin") {
          throw { statusCode: 403 };
        } else {
          next();
        }
      }else{
        throw { statusCode: 404 };
      }
  } catch (err) {
    next(err);
  }
};
module.exports = {authentication,authorizationAdmin,authorizationPost,authorizationPayment};