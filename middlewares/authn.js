// Kalian akan membuat autentikasinya
const { readPayload } = require('../helpers/helper')
const { User } = require('../models/index')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers;

        if (!access_token) {
            throw new Error("INVALID_TOKEN")
        }

        const payload = readPayload(access_token);

        const findUser = await User.findByPk(+payload.id)

        if (!findUser) {
            throw new Error("USER_NOT_FOUND")
        }

        req.additionalData = {
            id: findUser.id,
            nickname: findUser.nickname,
            email: findUser.email,
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication 