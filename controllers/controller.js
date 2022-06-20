const { Product, Category, Ingredient, Sale } = require("../models/index");

class Controller {
  static async addProduct(req, res, next) {
    try {
      const { name, description, imgUrl, price, CategoryId } = req.body;

      console.log(req.body);
    } catch (err) {
      next(err);
    }
  }
  static async getAllProducts(req, res, next) {
    try {
      const result = await axios.get({});
    } catch (err) {
      next(err);
    }
  }
  static async getOneProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async editProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  static async addCategory(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async getAllCategories(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async getOneCategory(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async editCategory(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  static async addIngredient(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async getAllIngredients(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async getOneIngredient(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async editIngredient(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async deleteIngredient(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  static async addRecipe(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async getAllRecipes(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async getOneRecipe(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async editRecipe(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async deleteRecipe(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  static async addSale(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async getAllSales(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
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
