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
        try{
            const {id} = req.params
            const {currentEpisode} = req.body
            
            const updateFavoriteanime = await FavoriteAnime.update({
                currentEpisode,
            }, {
                where: {
                    id: +id
                }
            })

            res.status(200).json({
                message: "currentpage was Update"
            })

        }
        catch(err){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static async getallFavoriteAnime (req, res){
        try{
            const UserId = +req.user.id
            const response = await FavoriteAnime.findAll({
                where: {
                    UserId,
                }
            })
            res.status(200).json(response)
        }
        catch(err){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static async deleteFavoriteAnime (req, res){
        try{
            const id = +req.params.id
            const favBeforeDelete = await FavoriteAnime.findByPk(id)
            if(!favBeforeDelete){
                throw {name: "Data not Found"}
            }
            const deleteFavoriteAnime = await FavoriteAnime.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({
                message: `Favorite with id ${id} deleted successfully`,
              });
        }
        catch(err){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}


module.exports = Controller