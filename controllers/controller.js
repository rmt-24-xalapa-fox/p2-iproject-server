const { User, MyDigimon } = require("../models");

class Controller {
  static async indexTes(req, res) {
    try {
      console.log("masok controller");
      res.send("Hello World");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
