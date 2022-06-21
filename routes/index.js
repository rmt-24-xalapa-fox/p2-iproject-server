const express = require("express");
const { checkPassword } = require("../helpers/bcrypt");
const { convertPayloadToToken } = require("../helpers/jwt");
const authentication = require("../middlewares/authentication");
const router = express.Router();
const { User, Follower, Following } = require("../models");

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

router.post("/follow/:UserFollowingId", async (req, res, next) => {
  try {
    const UserFollowingId = +req.params.UserFollowingId;
    const UserFollowerId = +req.user.id;

    if (UserFollowerId === UserFollowingId) {
      throw { msg: "Cannot following your self", code: 400 };
    }

    let following = await Following.findOne({
      where: {
        UserFollowingId,
      },
    });
    if (following) {
      throw { msg: "You have been following the user", code: 400 };
    }

    let follower = await Follower.create({
      UserId: UserFollowingId,
      UserFollowerId,
    });

    following = await Following.create({
      UserId: UserFollowerId,
      UserFollowingId,
    });

    res.status(201).json({
      message: "You are following the user",
    });
  } catch (err) {
    next(err);
  }
});

router.get("/followings/:UserId", async (req, res, next) => {
  try {
    const UserId = +req.params.UserId;

    let followings = await Following.findAll({
      where: {
        UserId,
      },
      include: ["User", "UserFollowing"],
    });

    res.status(200).json(followings);
  } catch (err) {
    next(err);
  }
});

router.get("/followers/:UserId", async (req, res, next) => {
  try {
    const UserId = +req.params.UserId;

    let followers = await Follower.findAll({
      where: {
        UserId,
      },
      include: ["User", "UserFollower"],
    });

    res.status(200).json(followers);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
