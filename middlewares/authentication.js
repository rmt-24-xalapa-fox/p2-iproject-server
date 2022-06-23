const { convertTokenToPayload } = require('../helpers/jwt')
const { Customer, Barber }  = require('../models')

const barberAuthentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw {name: 'InvalidToken'}
        }
        const payload = convertTokenToPayload(access_token)
        const { id } = payload
        const userCheck = await Barber.findByPk(id)
        if (!userCheck) {
            throw {name: 'InvalidToken'}
        }
        req.user = {
            id: userCheck.id,
            role: 'Barber'
        }
        next()

    } catch (err) {
        next(err)
    }
}

const customerAuthentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw {name: 'InvalidToken'}
        }
        const payload = convertTokenToPayload(access_token)
        const { id } = payload
        const userCheck = await Customer.findByPk(id)
        if (!userCheck) {
            throw {name: 'InvalidToken'}
        }
        req.user = {
            id: userCheck.id,
            role: 'Customer'
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { barberAuthentication, customerAuthentication }