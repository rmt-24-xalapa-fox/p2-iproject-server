const { User, Category, Book, Wishlist, Cart } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { CLIENT_ID } = process.env;
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../helpers/pagination");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;
      const createdUser = await User.create({
        email,
        password,
        username,
      });

      res.status(201).json({
        statusCode: 201,
        data: {
          message: "User has been created",
          newUser: {
            id: createdUser.id,
            email: createdUser.email,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "BadRequest" };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "InvalidCredential" };
      }

      const isPasswordCorrect = comparePassword(password, user.password);

      if (!isPasswordCorrect) {
        throw { name: "InvalidCredential" };
      }

      const payload = {
        id: user.id,
      };

      const token = sign(payload);

      res.status(200).json({
        statusCode: 200,
        data: {
          accessToken: token,
          id: user.id,
          email: user.email,
          role: user.role,
          username: user.username,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async googleSign(req, res, next) {
    try {
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.body.credential,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();

      let { email } = payload;
      let username = payload.name.split(" ").join("");

      let user = await User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        const token = sign({
          id: user.id,
          email: user.email,
        });

        res.status(200).json({
          statusCode: 200,
          data: {
            accessToken: token,
            id: user.id,
            email: user.email,
            username: user.username,
          },
        });
      } else {
        //tetap pake hooks, tapi pake kondisional di hooks.
        user = await User.create({
          email,
          username,
          password: "Google Sign In",
        });

        const token = sign({
          id: user.id,
          email: user.email,
        });

        res.status(201).json({
          statusCode: 201,
          data: {
            message: "user has been created",
            accessToken: token,
            id: user.id,
            email: user.email,
            username: user.username,
          },
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async readCategories(req, res, next) {
    try {
      let allCategories = await Category.findAll({
        order: [["id", "ASC"]],
        include: Book,
      });
      res.status(200).json({
        statusCode: 200,
        data: allCategories,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readBooks(req, res, next) {
    try {
      let options = {
        order: [["id", "ASC"]],
        include: [Category],
        where: {
          stock: {
            [Op.gt]: 0,
          },
        },
      };

      let { categoryId, name, minPrice, maxPrice, page } = req.query;

      if (name) {
        options.where.title = {
          [Op.iLike]: `%${name}%`,
        };
      }

      if (categoryId) {
        if (!Array.isArray(categoryId)) {
          categoryId = categoryId.split("%");
        }
        options.where.CategoryId = {
          [Op.or]: categoryId,
        };
      }

      if (minPrice && !maxPrice) {
        options.where.price = {
          [Op.gte]: minPrice,
        };
      } else if (!minPrice && maxPrice) {
        options.where.price = {
          [Op.lte]: maxPrice,
        };
      } else if (minPrice && maxPrice) {
        options.where.price = {
          [Op.between]: [minPrice, maxPrice],
        };
      }

      const limit = 9;
      options.limit = limit;

      const offset = getPagination(page, limit);
      options.offset = offset;

      const response = await Book.findAndCountAll(options);
      const finalResponse = getPagingData(response, page, limit);

      res.status(200).json({
        statusCode: 200,
        data: finalResponse,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readOneBook(req, res, next) {
    try {
      let id = +req.params.id;

      if (!Number(id)) {
        throw { name: "ParamsNotValid" };
      }

      let book = await Book.findOne({
        where: {
          id,
        },
        include: Category,
      });

      if (!book) {
        throw { name: "idNotFound" };
      }

      res.status(200).json({
        statusCode: 200,
        data: book,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readWishlists(req, res, next) {
    try {
      const { id: UserId } = req.user;

      const response = await Wishlist.findAll({
        where: {
          UserId,
        },
        include: [
          {
            model: Book,
            include: Category,
          },
        ],
      });

      res.status(200).json({
        statusCode: 200,
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addWishlists(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const { BookId } = req.params;

      const book = await Book.findByPk(BookId);

      if (!book) {
        throw { name: "idNotFound" };
      }

      const response = await Wishlist.create({
        UserId,
        BookId,
      });

      res.status(201).json({
        statusCode: 201,
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  static async removeWishlists(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const { BookId } = req.params;

      const book = await Book.findByPk(BookId);
      if (!book) {
        throw { name: "idNotFound" };
      }

      const response = await Wishlist.destroy({
        where: {
          UserId,
          BookId,
        },
      });

      if (!response) {
        throw { name: "wishlistNotFound" };
      }

      res.status(200).json({
        statusCode: 200,
        message: `successfully remove ${book.title} from your wishlists`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readCarts(req, res, next) {
    try {
      const { id: UserId } = req.user;

      const response = await Cart.findAll({
        where: {
          UserId,
        },
        include: [
          {
            model: Book,
            include: Category,
          },
        ],
      });

      res.status(200).json({
        statusCode: 200,
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addCarts(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const { BookId } = req.params;

      const book = await Book.findByPk(BookId);

      if (!book) {
        throw { name: "idNotFound" };
      }

      const response = await Cart.create({
        UserId,
        BookId,
      });

      res.status(201).json({
        statusCode: 201,
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  static async removeCarts(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const { BookId } = req.params;

      const book = await Book.findByPk(BookId);
      if (!book) {
        throw { name: "idNotFound" };
      }

      const response = await Cart.destroy({
        where: {
          UserId,
          BookId,
        },
      });

      if (!response) {
        throw { name: "wishlistNotFound" };
      }

      res.status(200).json({
        statusCode: 200,
        message: `successfully remove ${book.title} from your carts`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
