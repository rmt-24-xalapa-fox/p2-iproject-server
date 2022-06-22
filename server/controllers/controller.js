const { User } = require("../models");

class Controller {
  static async newUser(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username) {
        throw { name: "Username is required" };
      } else if (!email) {
        throw { name: "Email is required" };
      } else if (!password) {
        throw { name: "Password is required" };
      } else {
        const newUser = await User.create({
          username,
          email,
          password,
        });

        res.status(201).json({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        });
      }
    } catch (err) {
      if (err.name === "Username is required") {
        res.status(400).json({ message: "Username is required" });
      } else if (err.name === "Email is required") {
        res.status(400).json({ message: "Email is required" });
      } else if (err.name === "Password is required") {
        res.status(400).json({ message: "Password is required" });
      } else if (err.name === "SequelizeValidationError") {
        res.status(400).json({ message: "Invalid email format" });
      } else if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: "Email must be unique" });
      } 
    }
  }
}

module.exports = Controller;
