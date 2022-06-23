const router = require("express").Router();
const UserController = require("../controllers/userController");
const IndexController = require("../controllers/Http/Payments/IndexController");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const { Op, where } = require("sequelize");
const getPagination = require("../helpers/getPagination");
const getPagingData = require("../helpers/getPagingData");
const { Product, User, Cart } = require("../models")
const fetch = require("node-fetch");



//? TRANSACTION MIDTRANS
// router.post("/charge", IndexController.bankTransfer);
const midtransClient = require("midtrans-client");
// Create Snap API instance
router.post('/charge', authentication, async(req, res, next) => {
    try {
        const {total} = req.body
        const {id: UserId} = req.user

        const user = await User.findByPk(UserId)
        let snap = new midtransClient.Snap({
          // Set to true if you want Production Environment (accept real transaction).
          isProduction: false,
          serverKey: "SB-Mid-server-BKdejlopT9IIrgic6roqsBNv",
        });

        let order_id = new Date().getTime();

        let emailUser = user.email;

        console.log(emailUser, "<<< email");

        let first_name = emailUser.substring(0, emailUser.lastIndexOf("@"));
        let last_name = "customer";

        let parameter = {
          transaction_details: {
            order_id,
            gross_amount: +total,
          },
          credit_card: {
            secure: true,
          },
          customer_details: {
            first_name,
            last_name,
            email: user.email,
            phone: user.phoneNumber,
          },
        };

        await snap.createTransaction(parameter).then((transaction) => {
          // transaction token
          let transactionToken = transaction.token;
          res.status(200).json(transaction);
          console.log("transactionToken:", transactionToken);
        });
    } catch (err) {
        next(err)
    }
    
})


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

    const mycart = await Cart.findAll({
        where: {
            UserId: +id,
            status: "unpaid"
        },
        include: Product
    })

    console.log(mycart, "<<<<< my cart");

    let totalPrice = 0
    cart.Products.forEach((el) => {
      totalPrice += Number(el.price);
    });

    let totalItem = cart.Products.length

    res.status(200).json({
      data: cart,
      totalPrice: totalPrice,
      totalItem: totalItem,
    });
  } catch (err) {
    next(err);
  }
});

//? FETCH API BLOG
router.get("/blog", async(req, res, next) => {
    try {
        fetch(
          "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0c5be6ecf9e44df09394fc44bea5e816"
        )
          .then((res) => res.json())
          .then((json) => res.status(200).json(json));
    } catch (err) {
        next(err)
    }
})


//? FETCH 1 PRODUCT
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


//? DELETE PRODUCT CART
router.delete("/cart/:id", authentication, async (req, res, next) => {
  try {
    const { id } = req.params;

    const cart = await Cart.destroy({
      where: {
        ProductId: +id,
      },
    });

    if (!cart) {
      throw { name: "Product_not_found" };
    }

    res.status(200).json({
      statusCode: 200,
      data: `Success delete product from cart!`,
    });
  } catch (err) {
    next(err);
  }
});




router.use(errorHandler);

module.exports = router;
