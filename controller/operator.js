const { Unit, Operator } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { convertToToken } = require('../helpers/jwt')

class OpController {
    static async operatorLogin(req, res, next) {
        try {
            const { email, password } = req.body
            const operator = await Operator.findOne({ where: { email } })
            if (!operator) {
                throw { name: "email/password invalid" }
            }
            const valid = comparePassword(password, operator.password)
            if (!valid) {
                throw { name: "email/password invalid" }
            }
            const payload = { id: operator.id }
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

    static async addUnit(req, res, next) {
        try {
            const { RentalanId } = req.params
            const { psType } = req.body
            let status = 'available'
            const add = await Unit.create({ status, RentalanId, psType })
            res.status(201).json({
                add
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async readUnit(req, res, next) {
        try {
            const { RentalanId } = req.params
            const units = await Unit.findAll({ where: { RentalanId } })
            res.status(200).json({
                units
            })
        } catch (err) {
            next(err)
        }
    }

    static async editUnit(req, res, next) {
        try {
            const { UnitId } = req.params
            const { status } = req.body
            const edited = await Unit.update({ status: status }, { where: { id: UnitId } })
            res.status(200).json({
                msg: `Status changed to ${status}`
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteUnit(req, res, next) {
        try {
            const { UnitId } = req.params
            await Unit.destroy({ where: { id: UnitId } })
            res.status(200).json({
                msg: `Unit where id: ${UnitId} deleted`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = OpController