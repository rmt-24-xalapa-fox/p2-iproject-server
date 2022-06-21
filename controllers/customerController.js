const { compareHash } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/token')
const { User } = require('../models')

class customerController {

    static async registerCustomer(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address, province, city } = req.body
            const newUser = await User.create({
                username,
                email,
                password,
                phoneNumber,
                address,
                province,
                city
            })

            res.status(201).json({
                statusCode: 201,
                message: 'Success Create data',
                data: {
                    id: newUser.id,
                    email: newUser.email
                }
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async loginCustomer(req, res, next) {
        try {
            const { email, password } = req.body
            const logCust = await User.findOne({
                where: {
                    email
                }
            })
            if (!logCust) {
                throw new Error("passwordsalah")
            }
            const checkpw = compareHash(password, logCust.password)
            if (!checkpw) {
                throw new Error("passwordsalah")
            }
            const payload = {
                id: logCust.id,
                email: logCust.email
            }
            const token = createToken(payload)
            res.status(200).json({
                statusCode: 200,
                message: `Success Login`,
                access_token: token,
                data: {
                    id: logCust.id,
                    email: logCust.email,
                    username: logCust.username
                }
            })
        }
        catch (err) {
            next(err)
        }
    }


}

module.exports = customerController