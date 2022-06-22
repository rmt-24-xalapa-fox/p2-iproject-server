const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

const createToken = (data) => {
    return jwt.sign(data, SECRET_KEY)
}

const readPayload = (token) => {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = { createToken, readPayload }

