const { User } = require("../models");
const { compareHash } = require("../helpers/bcrypt");
const { convertPayloadToToken } = require("../helpers/token");
const verify = require("../helpers/OAuth2Client");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, phoneNumber} =
        req.body;

      const createdUser = await User.create({
        email,
        password,
        phoneNumber,
      });

      if (!createdUser) {
        throw { name: "RegistrationFailed" };
      }

      res.status(201).json({
        statusCode: 201,
        message: "User created successfully",
        data: {
          id: createdUser.id,
          email: createdUser.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({
        where: { email },
      });

      if (!foundUser) {
        throw { name: "UserNotFound" };
      }

      const userPassword = compareHash(password, foundUser.password);

      if (!userPassword) {
        throw { name: "InvalidPassword" };
      }

      const payload = {
        id: foundUser.id,
      };

      console.log(foundUser.id, "<<<<<<<<<<<< userId");

      const access_token = convertPayloadToToken(payload);

      console.log(access_token, "<<<<<<<<<<<<<< controller");

      res.status(200).json({
        statusCode: 200,
        data: {
          access_token,
          id: foundUser.id,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const token = req.body.credential;
      const payload = await verify(token);
      const email = payload.email;
      let access_token;
      // console.log(payload, "<<<<<<<<<<< payload");
      // console.log(token, "<<<<<<<<<<< accessToken");

      let user = await User.findOne({ where: { email } });
      if (user) {
        access_token = convertPayloadToToken({ id: user.id });
        res.status(201).json({
          statusCode: 201,
          data: {
            access_token,
            id: user.id,
            email: user.email,
          },
        });
      } else {
        const password = "Google Sign In";
        user = await User.create(
          {
            email,
            password,
          },
          { hooks: false }
        );
        access_token = convertPayloadToToken({ id: user.id });
        res.status(201).json({
          statusCode: 201,
          message: "User Added Successfully",
          data: {
            access_token,
            id: user.id,
            email: user.email,
          },
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
