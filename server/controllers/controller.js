const { checkPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Laundry, User_Laundry } = require("../models");

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
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      if (!username) {
        throw { name: "Username is required" };
      } else if (!password) {
        throw { name: "Password is required" };
      } else {
        const findUser = await User.findOne({
          where: { username },
        });

        if (!findUser) {
          throw { name: "Invalid email/password" };
        }

        const checkPass = checkPassword(password, findUser.password);

        if (!checkPass) {
          throw { name: "Invalid email/password" };
        }

        const payload = {
          id: findUser.id,
        };

        const access_token = createToken(payload);

        res.status(200).json({ access_token: access_token });
      }
    } catch (err) {
      if (err.name === "Username is required") {
        res.status(400).json({ message: "Username is required" });
      } else if (err.name === "Password is required") {
        res.status(400).json({ message: "Password is required" });
      } else if (err.name === "Invalid email/password") {
        res.status(401).json({ message: "Invalid email/password" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async getLaundries(req, res) {
    try {
      const laundryList = await Laundry.findAll();

      res.status(200).json(laundryList);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async newOrder(req, res) {
    try {
      const UserId = req.userId;
      const { LaundryId } = req.params;
      const { service, kg } = req.body;

      let cost = null;

      if (!service) {
        throw { name: "Service is required" };
      }

      if (!kg) {
        throw { name: "Kg is required" };
      }

      if (kg < 1) {
        throw { name: "Minimum kg is 1" };
      }
      if (kg >= 15) {
        throw { name: "Maximum kg is 15" };
      }
      
      if (service !== "Regular" && service !== "Express") {
        throw { name: "Service not found" };
      }

      if (service === "Regular") {
        cost = 6000 * +kg;
      } else if (service === "Express") {
        cost = 10000 * +kg;
      }

      const newOrders = await User_Laundry.create({
        UserId: +UserId,
        LaundryId: +LaundryId,
        service,
        kg: +kg,
        cost: +cost,
      });

      if (!newOrders) {
        throw { name: "Laundry not found" };
      }

      res.status(201).json(newOrders);
    } catch (err) {
      if (err.name === "Service is required") {
        res.status(400).json({ message: "Service is required" });
      } else if (err.name === "Service not found") {
        res.status(404).json({ message: "Service not found" });
      } else if (err.name === "Kg is required") {
        res.status(400).json({ message: "Kg is required" });
      } else if (err.name === "Minimum kg is 1") {
        res.status(400).json({ message: "Minimum kg is 1" });
      } else if (err.name === "Maximum kg is 15") {
        res.status(400).json({ message: "Maximum kg is 15" });
      } else if (err.name === "Laundry not found") {
        res.status(404).json({ message: "Laundry not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async myOrders (req, res) {
    try {
        const UserId = req.userId
        const myOrders = await User_Laundry.findAll({
            where:{
                UserId
            },
            include: Laundry
        })

        res.status(200).json(myOrders)
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = Controller;
