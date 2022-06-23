const jwt = require('jsonwebtoken')
const secretKey = 'rahasia ps'

function convertToToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' })
}

function convertToPayload(access_token) {
    return jwt.verify(access_token, secretKey)
}

module.exports = { convertToPayload, convertToToken }