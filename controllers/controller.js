const { comparedPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, FavoriteAnime } = require("../models");
const axios = require("axios");

class Controller {
  static async register(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const isValid = await axios({
        method: "get",
        url: `https://verifier.meetchopra.com/verify/${email}?token=2b1e810090b21cab8a8753ec6bd1f0919bc1c698e5439627351a7f8dbbd17041f0569652a98ec7a58777cfce4df37ae6`,
      });

      if (!isValid.data.status) {
        throw { name: "Email invalid" };
      }
      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      });
    } catch (err) {
      if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({
          message: `${err.errors[0].message}`,
        });
      } else if (err.name === "Email invalid") {
        res.status(401).json({
          message: "Email invalid",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username) {
        throw { name: "Username is required" };
      }
      if (!password) {
        throw { name: "Password is required" };
      }
      const foundUser = await User.findOne({
        where: { username },
      });

      if (!foundUser) {
        throw { name: "Invalid username/password" };
      }
      const isValid = comparedPassword(password, foundUser.password);
      if (!isValid) {
        throw { name: "Invalid username/password" };
      }

      const payload = {
        id: foundUser.id,
        username: foundUser.username,
      };
      const token = signToken(payload);
      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      if (err.name === "Username is required") {
        res.status(400).json({
          message: "Username is required",
        });
      } else if (err.name === "Password is required") {
        res.status(400).json({
          message: "Password is required",
        });
      } else if (err.name === "Invalid username/password") {
        res.status(401).json({
          message: "Invalid username/password",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

}

module.exports = Controller;
