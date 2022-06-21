const express = require("express");
const router = express.Router();
const { Post } = require("../models");
const multer = require("multer");
const path = require("path");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var fs = require("fs");

function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  return new Buffer.from(bitmap).toString("base64");
}

router.get("/", async (req, res, next) => {
  try {
    const UserId = req.user.id;

    let posts = await Post.findAll();

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/myposts", async (req, res, next) => {
  try {
    const UserId = req.user.id;

    let posts = await Post.findAll({
      where: {
        UserId,
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/upload",
  multer({ storage: diskStorage }).single("imageUrl"),
  async (req, res, next) => {
    try {
      let imageUrl = req.file.path;
      const { caption } = req.body;
      const UserId = +req.user.id;

      imageUrl = base64_encode(imageUrl);
      fs.unlinkSync(req.file.path);

      let post = await Post.create({
        UserId,
        caption,
        imageUrl,
      });

      res.status(201).json({
        message: "Upload success",
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
