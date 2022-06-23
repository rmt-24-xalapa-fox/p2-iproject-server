const { User } = require("../models");
const midtransClient = require("midtrans-client");
const { decryptPassword } = require("../helpers/bcrypt");
const { convertPayloadToToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      let profilePicture = undefined;
      if (req.file) {
        profilePicture = req.file.buffer.toString("base64");
      }
      const input = {
        name,
        email,
        password,
        profilePicture,
      };
      const user = await User.create(input);
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        message: `Account successfully created`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: `Email can't be empty` };
      }
      if (!password) {
        throw { name: `Password can't be empty` };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { name: "Invalid email/password" };
      }
      const passwordValidated = decryptPassword(password, user.password);
      if (!passwordValidated) {
        throw { name: "Invalid email/password" };
      }
      const payload = {
        id: user.id,
        email: user.email,
      };
      const access_token = convertPayloadToToken(payload);
      res.status(200).json({
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readUserById(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).json({
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editUserById(req, res, next) {
    try {
      const { name, email, password } = req.body;
      let profilePicture = undefined;
      if (req.file) {
        profilePicture = req.file.buffer.toString("base64");
      }
      const input = {
        name,
        email,
        password,
        profilePicture,
      };
      await User.update(input, {
        where: {
          id: req.user.id,
        },
        individualHooks: true,
      });
      res.status(200).json({
        message: `Your profile has been updated`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async createSnapToken(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const user = await User.findByPk(req.user.id);

      let parameter = {
        transaction_details: {
          order_id: `ColorSrc-upgrade-${user.name}-${user.id}`,
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          name: user.name,
          email: user.email,
        },
      };

      const { token } = await snap.createTransaction(parameter);
      res.status(201).json({
        token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async upgradePlan(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      if (user.plan === "Premium") {
        throw { name: "Your account is already premium" };
      }
      await User.update(
        { plan: "Premium" },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      res.status(200).json({
        message: `Your account's plan has been upgraded`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
