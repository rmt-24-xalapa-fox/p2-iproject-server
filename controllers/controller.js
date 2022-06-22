const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, MyDigimon } = require("../models");
const axios = require("axios");

class Controller {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const createdUser = await User.create({
        username,
        email,
        password,
        gachaCoin: 2000,
        role: "Customer",
      });
      res.status(201).json({
        email: createdUser.email,
        username: createdUser.username,
        role: createdUser.role,
      });
    } catch (err) {
      if (
        err.name == "SequelizeUniqueConstraintError" ||
        err.name == "SequelizeValidationError"
      ) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({ where: { email } });

      if (!foundUser) {
        throw { name: "InvalidLogin" };
      }

      const isMatched = comparePassword(password, foundUser.password);

      if (!isMatched) {
        throw { name: "InvalidLogin" };
      }

      const payload = {
        id: foundUser.id,
        role: foundUser.role,
      };

      const access_token = signToken(payload);

      res.status(200).json({ access_token, username: foundUser.username });
    } catch (err) {
      if (err.name == "InvalidLogin") {
        res.status(401).json({ message: "Invalid email/password" });
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async fetchCoin(req, res) {
    try {
      const userId = req.user.id;

      const foundUser = await User.findOne({ where: { id: userId } });
      res.status(200).json({ gachaCoin: foundUser.gachaCoin });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async fetchDataDigimon(req, res) {
    try {
      // console.log("masok");
      const dataDigimonFresh = await axios({
        method: "get",
        url: "https://digimon-api.vercel.app/api/digimon/level/Fresh",
      });

      const dataDigimonInTraining = await axios({
        method: "get",
        url: "https://digimon-api.vercel.app/api/digimon/level/In%20Training",
      });

      const dataDigimonRookie = await axios({
        method: "get",
        url: "https://digimon-api.vercel.app/api/digimon/level/Rookie",
      });

      // console.log(dataDigimonFresh);

      res.status(200).json({
        dataDigimonFresh: dataDigimonFresh.data,
        dataDigimonInTraining: dataDigimonInTraining.data,
        dataDigimonRookie: dataDigimonRookie.data,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async gachaDigimon(req, res) {
    try {
      const userId = req.user.id;

      const foundUser = await User.findOne({ where: { id: userId } });
      // console.log(foundUser);
      // console.log(foundUser.gachaCoin);
      if (foundUser.gachaCoin < 100) {
        // console.log("masok");
        throw { name: "NotEnoughCoin" };
      }

      await User.increment({ gachaCoin: -100 }, { where: { id: userId } });

      let gachaDigimonRate = [
        "Fresh",
        "Fresh",
        "Fresh",
        "Fresh",
        "In%20Training",
        "In%20Training",
        "In%20Training",
        "Rookie",
        "Rookie",
        "Rookie",
      ];

      let randomNumber1 = Math.floor(Math.random() * gachaDigimonRate.length);
      // console.log(randomNumber1);

      let gachaLevel = gachaDigimonRate[randomNumber1];
      // console.log(gachaLevel);

      const dataDigimonGacha = await axios({
        method: "get",
        url: `https://digimon-api.vercel.app/api/digimon/level/${gachaLevel}`,
      });

      let randomNumber2 = Math.floor(
        Math.random() * dataDigimonGacha.data.length
      );
      let gachaedDigimon = dataDigimonGacha.data[randomNumber2];
      // console.log(gachaedDigimon);

      // IF DUPE DISINI
      const foundMyDigimon = await MyDigimon.findOne({
        where: { UserId: userId, name: gachaedDigimon.name },
      });

      if (foundMyDigimon) {
        res.status(200).json({
          message: "You got a dupe ! Better luck next time !",
          name: foundMyDigimon.name,
          img: foundMyDigimon.img,
          level: foundMyDigimon.level,
        });
      } else {
        const createdMyDigimon = await MyDigimon.create({
          UserId: userId,
          name: gachaedDigimon.name,
          img: gachaedDigimon.img,
          level: gachaedDigimon.level,
        });

        res.status(201).json({
          message: "You got a new Digimon !",
          name: createdMyDigimon.name,
          img: createdMyDigimon.img,
          level: createdMyDigimon.level,
        });
      }
    } catch (err) {
      if (err.name == "NotEnoughCoin") {
        res.status(404).json({ message: "You dont have enough coins !" });
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async fetchMyDigimon(req, res) {
    try {
      // console.log("masok");
      const userId = req.user.id;

      // const foundUser = await User.findOne({
      //   where: { id: userId },
      //   include: { model: MyDigimon, order: [["level"]] },
      // });

      const foundMyDigimon = await MyDigimon.findAll({
        where: {
          UserId: userId,
        },
        order: ["level", "name"],
      });

      // console.log(foundUser);
      res.status(200).json(foundMyDigimon);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
