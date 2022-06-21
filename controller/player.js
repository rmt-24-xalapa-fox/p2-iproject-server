const { Rentalan, Player, Unit } = require('../models/index')
const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const { convertToToken } = require('../helpers/jwt')

class PlayerController {
    static async playerRegistration(req, res, next) {
        try {
            let { email, password } = req.body
            if (!email) {
                throw { name: "email is requrired" }
            }
            if (!password) {
                throw { name: "password is requrired" }
            }
            password = hashPassword(password)
            const registran = await Player.create({ email, password })
            res.status(201).json({
                msg: "success register"
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async playerLogin(req, res, next) {
        try {
            const { email, password } = req.body
            const player = await Player.findOne({ where: { email } })
            if (!player) {
                throw { name: "email/password invalid" }
            }
            const valid = comparePassword(password, player.password)
            if (!valid) {
                throw { name: "email/password invalid" }
            }
            const payload = { id: player.id }
            const token = convertToToken(payload)
            res.status(200).json({
                email,
                access_token: token
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async readRentalan(req, res, next) {
        try {
            const rentalan = await Rentalan.findAll()
            res.status(200).json({
                rentalan
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async bookUnit(req, res, next) {
        try {
            const { UnitId } = req.params
            const { status } = req.body
            const found = await Unit.findByPk(UnitId)
            if (!found) {
                throw { name: "Not found Unit" }
            }
            await Unit.update({ status: status }, { where: { id: UnitId } })
            res.status(200).json({
                msg: `Unit where id ${UnitId} booked`
            })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = PlayerController