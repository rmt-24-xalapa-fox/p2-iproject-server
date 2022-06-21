const express = require("express");
const router = express.Router();
const { Like, User, Post } = require("../models");

router.get("/:PostId", async (req, res, next) => {
  try {
    const PostId = +req.params.PostId;

    let likes = await Like.findAll({
      include: [User, Post],
      where: {
        PostId,
      },
      attributes: {
        include: ["id"],
      },
    });

    res.status(200).json(likes);
  } catch (err) {
    next(err);
  }
});

router.post("/:PostId", async (req, res, next) => {
  try {
    const UserId = +req.user.id;
    const PostId = +req.params.PostId;

    let isLikeAble = await Like.findOne({
      where: {
        UserId,
        PostId,
      },
    });
    if (isLikeAble) {
      throw { msg: "You are already like", code: 400 };
    }

    const like = await Like.create({
      UserId,
      PostId,
    });

    res.status(201).json({
      message: "Success like",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
