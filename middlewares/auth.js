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

const loginOrNot = async (req, res, next) => {
  try {
    const {access_token} = req.headers;
    console.log(req.headers.access_token);
    console.log(req.body);
    if(!access_token||access_token=="null"||access_token==""||access_token==null){
      next();
    }else{
      const payload = tokenToPayload(access_token);
      console.log(payload);
      const userFound = await User.findByPk(payload.id);
  
      if (!userFound) {
        next();
      } else {
        req.user = {
          id: userFound.id,
          email: userFound.email,
          role: userFound.role
        };
      }
      next();
    }
    
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
    let {id}=req.params
    let post = await Post.findByPk(id);
      if (req.user.id != post.UserId) {
          throw { statusCode: 403 };
        } else {
          req.posts=post;
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
module.exports = {authentication,authorizationAdmin,authorizationPost,authorizationPayment,loginOrNot};