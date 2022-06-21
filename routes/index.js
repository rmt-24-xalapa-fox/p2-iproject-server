const express = require("express");
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

module.exports = router;
