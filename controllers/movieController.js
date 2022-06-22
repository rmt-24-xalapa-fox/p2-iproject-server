const movie_api = require("../apis/movie_api");
const midtransClient = require("midtrans-client");
const { Transaction, Price, User } = require("../models");
const serverKey = process.env.serverKey;
const API_KEY = process.env.API_KEY;

const getPopularMovie = async (req, res, next) => {
    try {
        // const response = await axios.get(format(urlPopularMovie));
        const response = await movie_api.get(
            `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        res.status(200).json(response.data);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const getMovieDetail = async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const response = await movie_api.get(
            `/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        );

        res.status(200).json(response.data);
    } catch (err) {
        next(err);
    }
};

const addTransaction = async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const { PriceId } = req.body;
        const id = req.userOnLogin.id;
        // console.log(id, movieId, PriceId, "hereeeeeeeeee");

        const order = await Transaction.create(
            { UserId: id, MovieId: movieId, PriceId: PriceId },
            {
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            }
        );

        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
};

const getPrice = async (req, res, next) => {
    try {
        const order = await Price.findAll();
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

const getTransaction = async (req, res, next) => {
    try {
        const id = req.userOnLogin.id;
        const order = await Transaction.findAll({
            where: {
                UserId: id,
            },
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

const patchTransaction = async (req, res, next) => {
    try {
        // const id = req.userOnLogin.id;
        const { orderId } = req.params;

        const order = await Transaction.findByPk(orderId);

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

// ! ================================================================ Nidtrans Payment
const generateOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { MovieId } = req.body;
        console.log(req.body, orderId);
        const userId = req.userOnLogin.id;
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
                name: resultOrder[0].User.name,
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

module.exports = {
    getPopularMovie,
    getMovieDetail,
    addTransaction,
    generateOrder,
    getTransaction,
    getPrice,
    patchTransaction,
};