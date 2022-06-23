const { readPayload } = require('../helpers/token')
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        const getPayload = readPayload(access_token)
        const checkUser = await User.findByPk(+getPayload.id)
        if (!checkUser) {
            throw new Error(`Email_nf`)
        }
        req.additionalData = {
            id: checkUser.id,
            email: checkUser.email
        }
        next()
    }
    catch (err) {
        next(err)
    }
}

module.exports = authentication

