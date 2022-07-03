const { Player, Operator } = require('../models')
const { convertToToken, convertToPayload } = require('../helpers/jwt')

const playerAuthentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers

        if (!access_token) {
            throw { name: "Invalid token" }
        }

        const payload = convertToPayload(access_token)
        const { id } = payload
        const player = await Player.findByPk(id)

        if (!player) {
            throw { name: "Invalid token" }
        }

        req.player = { id: player.id }
        next()
    } catch (err) {
        next(err)
    }
}

const operatorAuthentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers

        if (!access_token) {
            throw { name: "Invalid token" }
        }

        const payload = convertToPayload(access_token)
        const { id } = payload
        const operator = await Operator.findByPk(id)

        if (!operator) {
            throw { name: "Invalid token" }
        }

        req.operator = { id: operator.id }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { playerAuthentication, operatorAuthentication }