const { CardUser, User, Player } = require('../models')

class carduserController {
    static async getCardUser(req, res, next) {
        try {
            const getData = await CardUser.findAll({
                where: {
                    UserId: +req.additionalData.id
                },
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "password"]
                        }
                    },
                    {
                        model: Player,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    }
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },


            )
            res.status(200).json({
                statusCode: 200,
                data: getData
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async postCardUser(req, res, next) {
        try {
            const checkCard = await Player.findByPk(+req.params.playerId)
            if (!checkCard) {
                throw new Error(`NOT_FOUND`)
            }

            const checkDouble = await CardUser.findOne({
                where: {
                    UserId: +req.additionalData.id,
                    PlayerId: +req.params.playerId,
                    status: `unpaid`
                }
            })
            if (checkDouble) {
                throw new Error(`already`)
            }
            if (!checkDouble) {

            }

            const addCardUser = await CardUser.create({
                UserId: +req.additionalData.id,
                PlayerId: +req.params.playerId,
                status: `unpaid`
            })
            delete addCardUser.dataValues.createdAt
            delete addCardUser.dataValues.updatedAt
            res.status(201).json({
                statusCode: 201,
                data: addCardUser
            })
        }
        catch (err) {
            next(err)
        }
    }

}

module.exports = carduserController