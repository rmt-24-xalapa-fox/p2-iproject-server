const { CardUser, User, Player } = require('../models')

class carduserController {

    static async updateUser(req, res, next) {
        try {
            let id = +req.additionalData.id
            const { username, phoneNumber, address, province, city } = req.body
            const updateUser = await User.update({
                username,
                phoneNumber,
                address,
                province,
                city
            }
                ,
                {
                    where: {
                        id
                    }
                })
            res.status(200).json({
                statusCode: 200,
                message: `berhasil update`
            })
        }
        catch (err) {
            next(err)
        }
    }
    static async getUser(req, res, next) {
        try {
            let id = req.additionalData.id
            const profileUser = await User.findOne({
                where: {
                    id
                },
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt"]
                }
            })
            if (!profileUser) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                data: profileUser
            })
        }
        catch (err) {
            next(err)
        }
    }
    static async getCardUser(req, res, next) {
        try {
            let totalPrice = 0
            const getData = await CardUser.findAll({
                where: {
                    UserId: +req.additionalData.id,
                    status: `unpaid`
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
            getData.forEach(x => {
                totalPrice += x.Player.price
            })
            res.status(200).json({
                statusCode: 200,
                data: getData,
                totalPrice: totalPrice
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async historyCard(req, res, next) {
        try {
            const getData = await CardUser.findAll({
                where: {
                    UserId: +req.additionalData.id,
                    status: `paid`
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
                    exclude: ["createdAt"]
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

    static async updatePaidCart(req, res, next) {
        try {
            let idUser = +req.additionalData.id
            let idCard = +req.params.cardId
            const updateCart = await CardUser.update({
                status: `paid`
            }, {
                where: {
                    UserId: idUser,
                    status: 'unpaid'
                }
            })
            if (!updateCart) {
                throw new Error(`NOT_FOUND`)
            }
            console.log(`berhasil`);
            res.status(200).json({
                message: `berhasil update`
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async removeCart(req, res, next) {
        try {
            let id = +req.params.id
            const delData = await CardUser.destroy({
                where: {
                    id
                }
            })
            if (!delData) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                message: `Berhasil delete data`
            })
        }
        catch (err) {
            next(err)
        }
    }

}

module.exports = carduserController