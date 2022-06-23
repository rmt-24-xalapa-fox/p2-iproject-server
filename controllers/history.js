const { User, Movie, Genre, MovieGenre,History } = require('../models')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
class Controller {

    static async getHistory(req, res, next) {
        try {
            console.log("GET HISTORy")
            let history = await History.findAll();
            if (history) {
                res.status(200).json({ History: history });
            } else {
                throw { statusCode: 404 };
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = Controller;