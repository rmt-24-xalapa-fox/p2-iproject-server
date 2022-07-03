const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey

function signToken(payload) {
    return jwt.sign(payload, secretKey)
}

function convertToken(token){
    return jwt.verify(token, secretKey)
}
module.exports = {signToken, convertToken}