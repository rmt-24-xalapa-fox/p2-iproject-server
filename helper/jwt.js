'use strict'

const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY;

function createToken(data) {
    return jwt.sign(data, secretKey, {
        expiresIn: "10h"
    })
}

function readPayload(token) {
    return jwt.verify(token, secretKey)
}

module.exports = {
    createToken,
    readPayload
} 