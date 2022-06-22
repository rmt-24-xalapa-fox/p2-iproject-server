const { User, Wishlist, Cart } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { getToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { CLIENT_ID, CLIENT_SECRET, MERCHANT_ID, CLIENT_KEY, SERVER_KEY } =
  process.env;
const axios = require("axios");
const midtransClient = require("midtrans-client");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const input = {
        username,
        email,
        password,
      };

      const createdUser = await User.create(input);
      res.status(201).json({
        message: "User has been created",
        newUser: {
          id: createdUser.id,
          email: createdUser.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { name: "USER_NOT_FOUND" };
      }

      const isMatched = compare(password, user.password);
      if (!isMatched) {
        throw { name: "USER_NOT_FOUND" };
      }

      const payload = {
        id: user.id,
      };

      const token = getToken(payload);

      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async googleLogin(req, res, next) {
    // console.log(req.headers)
    try {
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.credential,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      let email = payload.email;

      let user = await User.findOne({ where: { email } });

      if (user) {
        const token = getToken({
          id: user.id,
        });
        res.status(200).json({
          statusCode: 200,
          data: {
            access_token: token,
            authorId: user.id,
            name: user.username,
            role: user.role,
          },
        });
      } else {
        const username = payload.name.split(" ").join("_");
        const input = {
          username,
          email,
          password: "Google Sign In",
        };
        let newUser = await User.create(input);

        const token = getToken({
          id: newUser.id,
        });

        res.status(201).json({
          access_token: token,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async getAllProducts(req, res, next) {
    try {
      const { page, type, tag, brand } = req.query;
      const limit = 12;
      let offset = 0;
      if (page > 1) {
        offset = (page - 1) * limit;
      } else {
        offset = 0;
      }

      let url = `http://makeup-api.herokuapp.com/api/v1/products.json`;
      if (type) {
        url = `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${type}`;
      }
      if (tag) {
        url = `http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=${tag}`;
      }
      if (type && tag) {
        url = `http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=${tag}&product_type=${type}`;
      }
      if (brand) {
        url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`;
      }
      if (type && brand) {
        url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${type}`;
      }
      if (tag && brand) {
        url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_tags=${tag}`;
      }
      if (tag && brand && type) {
        url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_tags=${tag}&product_type=${type}`;
      }

      const response = await axios({
        method: "GET",
        url,
      });
      const data = response.data.slice(offset, offset + limit);

      let currentPage = 0;
      if (!page) {
        currentPage = 1;
      } else {
        currentPage = page;
      }

      let totalPages = Math.ceil(response.data.length / limit);

      res.status(200).json({
        currentPage,
        totalPages,
        data,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getOneProduct(req, res, next) {
    try {
      const { ProductId } = req.params;
      let url = `http://makeup-api.herokuapp.com/api/v1/products.json`;
      const response = await axios({
        method: "GET",
        url,
      });
      const product = response.data.find((el) => +el.id === +ProductId);
      if (!product) {
        throw { name: "PRODUCT_NOT_FOUND" };
      }
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
  static async addWishlist(req, res, next) {
    try {
      const { id } = req.user;
      const {
        productId,
        productName,
        productBrand,
        productPrice,
        productImage,
        productDescription,
        productCategory,
        productType,
        productTags,
        productColors,
      } = req.body;
      const input = {
        UserId: +id,
        productId,
        productName,
        productBrand,
        productPrice,
        productImage,
        productDescription,
        productCategory,
        productType,
        productTags,
        productColors,
      };

      const newWishlist = await Wishlist.create(input);
      console.log("masukj add wishlistr <<<<<<<<<<<<<<<<<<<<<<<<<");
      res.status(201).json(newWishlist);
    } catch (err) {
      next(err);
    }
  }
  static async getWishlists(req, res, next) {
    try {
      const { id } = req.user;
      const wishlists = await Wishlist.findAll({
        where: {
          UserId: +id,
        },
      });
      res.status(200).json(wishlists);
    } catch (err) {
      next(err);
    }
  }
  static async addCart(req, res, next) {
    try {
      const { id } = req.user;
      const {
        productId,
        productName,
        productBrand,
        productPrice,
        productImage,
        productDescription,
        productCategory,
        productType,
        productTags,
        productColors,
      } = req.body;

      const input = {
        UserId: +id,
        productId,
        productName,
        productBrand,
        productPrice,
        productImage,
        productDescription,
        productCategory,
        productType,
        productTags,
        productColors,
      };

      const newCart = await Cart.create(input);
      console.log("masukj add cart <<<<<<<<<<<<<<<<<<<<<<<<<");

      res.status(201).json(newCart);
    } catch (err) {
      next(err);
    }
  }
  static async getCart(req, res, next) {
    try {
      const { id } = req.user;
      const cart = await Cart.findAll({
        where: {
          UserId: +id,
        },
      });
      console.log("masuk cart <<<<<<<<<<<<<<<<");
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }
  static async getTokenTransaction(req, res, next) {
    try {
      const { megaTotalPrice } = req.body;
      const { id } = req.user;
      const user = await User.findByPk(+id);
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: SERVER_KEY,
      });
      let random = Math.floor(Math.random()*(700)+1)
      let parameter = {
        transaction_details: {
          order_id: `${id}-${random}-123456`,
          gross_amount: megaTotalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username: user.username,
          email: user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter)
      let transactionToken = transaction.token;
      res.status(201).json(transactionToken)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}
module.exports = Controller;
