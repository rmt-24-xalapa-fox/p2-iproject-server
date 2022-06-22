
const { Player, Category, Position, Team, User } = require('../models')

class playerController {
    static async getTeam(req, res, next) {
        try {
            const basketTeam = await Team.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            res.status(200).json({
                statusCode: 200,
                data: basketTeam
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async getPositions(req, res, next) {
        try {
            const positionPlayer = await Position.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            res.status(200).json({
                statusCode: 200,
                data: positionPlayer
            })
        }
        catch (err) {
            next(err)
        }
    }
    static async getCategories(req, res, next) {
        try {
            const CategoriesPlayer = await Category.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            res.status(200).json({
                statusCode: 200,
                data: CategoriesPlayer
            })
        }
        catch (err) {
            next(err)
        }
    }
    static async getPlayers(req, res, next) {
        try {
            const dataPlayer = await Player.findAndCountAll({
                include: [{
                    model: Position,
                    attributes: {
                        exclude: ["id", "createdAt", "updatedAt"]
                    }
                },
                {
                    model: Team,
                    attributes: {
                        exclude: ["id", "createdAt", "updatedAt"]
                    }
                }, {
                    model: Category,
                    attributes: {
                        exclude: ["id", "createdAt", "updatedAt"]
                    }
                }, {
                    model: User,
                    attributes: {
                        exclude: ["id", "createdAt", "updatedAt"]
                    }
                }
                ],


                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            res.status(200).json({
                statusCode: 200,
                data: dataPlayer
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async getPlayerId(req, res, next) {
        try {
            const id = +req.params.id
            const dataPlayer = await Player.findOne({
                where: {
                    id
                },
                include: [{
                    model: Position,
                    attributes: {
                        exclude: ["id", "createdAt", "updatedAt"]
                    }
                },
                {
                    model: Team,
                    attributes: {
                        exclude: ["id", "createdAt", "updatedAt"]
                    }
                }, {
                    model: Category,
                    attributes: {
                        exclude: ["id", "createdAt", "updatedAt"]
                    }
                }, {
                    model: User,
                    attributes: {
                        exclude: ["id", "password", "createdAt", "updatedAt"]
                    }
                }
                ],
            })
            res.status(200).json({
                statusCode: 200,
                data: dataPlayer
            })
        }
        catch (err) {
            next(err)
        }
    }

}

module.exports = playerController