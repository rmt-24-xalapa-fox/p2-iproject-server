const {
  Product,
  Category,
  Ingredient,
  Recipe,
  Sale
} = require("../models/index");

class Controller {
  static async addProduct(req, res, next) {
    try {
      const { name, description, imgUrl, price, CategoryId } = req.body;

      const product = await Product.create({
        name,
        description,
        imgUrl,
        price,
        CategoryId
      });

      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  } //√
  static async getAllProducts(req, res, next) {
    try {
      const result = await Product.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"]
          }
        },
        order: [["createdAt", "DESC"]]
      });

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  } //√
  static async getOneProduct(req, res, next) {
    try {
      const id = +req.params.id;
      console.log(id, `<<<< controller`);
      const result = await Product.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"]
          }
        },
        where: {
          id: +id
        }
      });

      if (result.length <= 0) {
        throw new Error(`Product not found`);
      }

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  } //√
  static async editProduct(req, res, next) {
    try {
      const id = +req.params.id;

      const { name, description, imgUrl, price, CategoryId } = req.body;

      const result = await Product.update(
        {
          name,
          description,
          imgUrl,
          price,
          CategoryId,
          updatedAt: new Date()
        },
        {
          where: {
            id: id
          },
          returning: true
        }
      );

      if (result[0] <= 0) {
        throw new Error(`Product not found`);
      }

      let productId = result[1][0].id;
      let productName = result[1][0].name;

      res.status(200).json({
        message: `Product ${productName} with id ${productId} has been updated`
      });
    } catch (err) {
      next(err);
    }
  } //√
  static async deleteProduct(req, res, next) {
    try {
      const id = +req.params.id;

      const deletedProduct = await Product.destroy({
        where: {
          id
        },
        returning: true
      });

      if (deletedProduct <= 0) {
        throw new Error(`Product not found`);
      }

      res.status(201).json({
        message: `Product with id ${id} has been deleted`
      });
    } catch (err) {
      next(err);
    }
  } //√

  static async getAllCategories(req, res, next) {
    try {
      const result = await Category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  } //√

  static async addRecipe(req, res, next) {
    try {
      let { measurement, IngredientId, ProductId } = req.body;

      const recipe = await Recipe.create({
        measurement: +measurement,
        IngredientId: +IngredientId,
        ProductId: +ProductId
      });

      res.status(201).json(recipe);
    } catch (err) {
      next(err);
    }
  }

  static async addSale(req, res, next) {
    try {
      let { qty, ProductId } = req.body;

      let product = await Product.findByPk(+ProductId, {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });

      let productRecipe = await Recipe.findAll({
        include: {
          model: Ingredient,
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"]
          }
        },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "IngredientId", "ProductId"]
        },
        where: {
          ProductId: ProductId
        }
      });

      let sales = +qty * +product.price;
      let cost = 0;

      productRecipe.forEach(el => {
        cost += +el.measurement * el.Ingredient.cost;
      });

      const newSales = await Sale.create({
        quantity: +qty,
        sales,
        cost,
        ProductId: +ProductId
      });

      res.status(201).json(newSales);
    } catch (err) {
      next(err);
    }
  } //√
  static async getAllSales(req, res, next) {
    try {
      const result = await Sale.findAll({
        include: {
          model: Product,
          attributes: {
            exclude: [
              "id",
              "description",
              "imgUrl",
              "price",
              "CategoryId",
              "createdAt",
              "updatedAt"
            ]
          }
        },
        attributes: {
          exclude: ["id", "updatedAt", "ProductId"]
        },
        order: [["createdAt", "DESC"]]
      });

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  } // √

  static async getOneSale(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async editSale(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async deleteSale(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  Controller
};
