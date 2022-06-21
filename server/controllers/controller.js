const { User, Mountain, Quota, License } = require("../models");
class Controller {
  static async registerController(req, res, next) {
    try {
      const { email, name, password, phoneNumber, numberOfClimbers } = req.body;
      const createdUser = await User.create({
        email,
        name,
        password,
        phoneNumber,
        numberOfClimbers,
      });
      const data = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      };
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
