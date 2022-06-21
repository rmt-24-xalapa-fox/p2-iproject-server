const axios = require("axios");
const { decryptPassword } = require("../helpers/bcrypt");
const { convertPayloadToToken } = require("../helpers/jwt");
const { User, ColorPalette } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const input = {
        name,
        email,
        password,
      };
      const user = await User.create(input);
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
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

  static async readAllPalettes(req, res, next) {
    try {
      const colorPalettes = await ColorPalette.findAll({
        where: {
          UserId: req.user.id,
        },
      });
      res.status(200).json(colorPalettes);
    } catch (err) {
      next(err);
    }
  }

  static async generatePalette(req, res, next) {
    try {
      let { colorScheme } = req.body;
      if (!colorScheme) {
        colorScheme = "Monochromatic";
      }
      const headers = {
        "X-RapidAPI-Host": "random-palette-generator.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
      };
      let { data } = await axios.get(
        `https://random-palette-generator.p.rapidapi.com/palette/${colorScheme}/1/5`,
        { headers }
      );
      const palette = data.data[0].palette;
      res.status(200).json(palette);
    } catch (err) {
      next(err);
    }
  }

  static async readPaletteById(req, res, next) {
    try {
      const { colorPaletteId } = req.params;
      const colorPalette = await ColorPalette.findByPk(colorPaletteId);
      if (!colorPalette) {
        throw { name: "Palette not found" };
      }
      res.status(200).json(colorPalette);
    } catch (err) {
      next(err);
    }
  }

  static async addPalette(req, res, next) {
    try {
      const { name, colors } = req.body;
      const input = {
        name,
        colors,
        UserId: req.user.id,
      };
      const colorPalette = await ColorPalette.create(input);
      res.status(201).json({
        id: colorPalette.id,
        name: colorPalette.name,
        message: "Color palette added successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
