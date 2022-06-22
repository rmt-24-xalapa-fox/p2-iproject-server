const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const { Op, where } = require("sequelize");
const getPagination = require("../helpers/getPagination");
const getPagingData = require("../helpers/getPagingData");
const { Product, User, Cart } = require("../models")
const fetch = require("node-fetch");
const { createAdd } = require("typescript");

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.post("/google-sign", UserController.googleLogin);

//? FETCH ALL PRODUCTS
router.get("/products", async (req, res, next) => {
  try {
    const { page, size, title } = req.query;
    const options = {
      order: [["id", "ASC"]],
    };

    if (title) {
      options.where = {
        ...options.where,
        title: {
          [Op.iLike]: `%${title}%`,
        },
      };
    }

    const { limit, offset } = getPagination(page, size);
    options.limit = limit;
    options.offset = offset;

    const product = await Product.findAndCountAll(options);
    const response = getPagingData(product, page, limit);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

//? FETCH MY CART
router.get("/cart", authentication, async (req, res, next) => {
  try {
    const { id } = req.user;

    const cart = await User.findByPk(id, {
      include: [
        {
          model: Product,
        },
      ],
      attributes: ["email"],
    });

    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
});


//? FETCH 1 PRODUCTS
router.get("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      throw { name: "Product_not_found" };
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});



//? ADD PRODUCT TO CART
router.post("/products/:id", authentication, async(req, res, next) => {
    try {
      const { id } = req.params;
      const { id: UserId } = req.user;
      if (!id) {
        throw { name: "BadRequest" };
      }

      const cart = await Cart.create({
        UserId: +UserId,
        ProductId: +id,
        status: "unpaid"
      });

      res.status(201).json(cart);
    } catch (err) {
        console.log(err);
      next(err);
    }
});




router.use(errorHandler);

module.exports = router;
