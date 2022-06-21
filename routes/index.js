const express = require("express");
const { checkPassword } = require("../helpers/bcrypt");
const { convertPayloadToToken } = require("../helpers/jwt");
const authentication = require("../middlewares/authentication");
const router = express.Router();
const { User } = require("../models");

router.post("/register", async (req, res, next) => {
  try {
    const { email, password, username, address, moto } = req.body;

    let user = await User.create({ email, password, username, address, moto });

    res.status(201).json({
      message: "User created",
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw { msg: "Email is required", code: 400 };
    }
    if (!password) {
      throw { msg: "Password is required", code: 400 };
    }

    let user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw { msg: "Error invalid username or email or password", code: 401 };
    }

    const isValid = checkPassword(password, user.password);
    if (!isValid) {
      throw { msg: "Error invalid username or email or password", code: 401 };
    }

    const payload = {
      id: user.id,
    };
    const token = convertPayloadToToken(payload);

    res.status(200).json({
      access_token: token,
    });
  } catch (err) {
    next(err);
  }
});

//! AUTHENTICATION
router.use(authentication);

router.use("/posts", require("../routes/posts"));

module.exports = router;
