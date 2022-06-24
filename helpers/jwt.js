'use strict'

const jwt = require('jsonwebtoken')

const createToken = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY)
}

const readPayload = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}


module.exports = {
    createToken,
    readPayload
}