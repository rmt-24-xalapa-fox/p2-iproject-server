const axios = require("axios");
const { ColorPalette } = require("../models");

class PaletteController {
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

module.exports = PaletteController;
