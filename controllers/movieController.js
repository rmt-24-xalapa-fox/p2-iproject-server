const midtransClient = require("midtrans-client");
const { Transaction, Price, User } = require("../models");
const serverKey = process.env.serverKey;
const apiMovie = require("../api/api_url.js");
const API_KEY = process.env.API_KEY;

class movieController {

  static async getPopularMovie(req, res, next) {
    try {
      // const response = await axios.get(format(urlPopularMovie));
      const response = await apiMovie.get(
        `/movie/popular?api_key=${API_KEY}`
      );
      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  static async getTrendingMovie(req, res, next) {
    try {
      // const response = await axios.get(format(urlPopularMovie));
      const response = await apiMovie.get(
        `/trending/movie/week?api_key=${API_KEY}`
      );
      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  static async getTopMovie(req, res, next) {
    try {
      // const response = await axios.get(format(urlPopularMovie));
      const response = await apiMovie.get(
        `/movie/top_rated?api_key=${API_KEY}`
      );
      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static async getMovieDetail(req, res, next) {
    try {
      console.log(req.params, " ini movieID");
      const { movieId } = req.params;
      const response = await apiMovie.get(
        `/movie/${movieId}?api_key=${API_KEY}`
      );

      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static async addTransaction(req, res, next) {
    try {
      const { movieId } = req.params;
      const { PriceId } = req.body;
      const id = req.userOnLogin.id;

      const order = await Transaction.create({
        UserId: id,
        MovieId: movieId,
        PriceId: PriceId
      },
        {
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        }
      );

      res.status(201).json(order);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static async getPrice(req, res, next) {
    try {
      const order = await Price.findAll();
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  };

  static async getTransaction(req, res, next) {
    try {
      const { id } = req.userOnLogin;
      const order = await Transaction.findAll({
        where: {
          UserId: id,
        },
        order: [["createdAt", "DESC"]],
      });
      console.log(order);
      res.status(200).json(order);
    } catch (err) {
      console.log(err, "get trans error");
      next(err);
    }
  };

  static async patchTransaction(req, res, next) {
    try {
      const { orderId } = req.params;

      // const order = await Transaction.findByPk(orderId);
      const result = await Transaction.update(
        {
          status: "success",
        },
        {
          where: {
            id: orderId,
          },
          returning: true,
        }
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  static async generateOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const { MovieId } = req.body;
      // console.log(req.body, orderId, "tes ini generate order");
      const resultOrder = await Transaction.findAll({
        include: [
          {
            model: User,
            include: [
              {
                model: Price,
              },
            ],
          },
        ],
        where: {
          id: orderId,
        },
      });
      // console.log(resultOrder, "hasil result order");
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: serverKey,
      });

      let parameter = {
        transaction_details: {
          order_id: orderId,
          movie_id: MovieId,
          gross_amount: resultOrder[0].User.Prices[0].price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          name: resultOrder[0].User.username,
          email: resultOrder[0].User.email,
        },
      };

      let generateTransaction = await snap.createTransaction(parameter);
      res.status(200).json(generateTransaction);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

}

module.exports = movieController