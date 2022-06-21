const { comparedPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {User, FavoriteAnime} = require('../models');

class Controller {
    static async addFavoriteAnime (req, res){
        try{
            const {title, currentEpisode, totalEpisode, imgUrl, animeUrl} = req.body
            const {id} = req.user
            const response = await FavoriteAnime.create({
                title,
                currentEpisode,
                totalEpisode,
                imgUrl,
                animeUrl,
                UserId: id
            })

            res.status(201).json({
                message: `${response.title} has been added to Favorite`
            })

        }
        catch(err){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static async updateFavoriteanime(req, res){
        
    }
}


module.exports = Controller