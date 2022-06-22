const jwt = require("jsonwebtoken")
// const secretKey = process.env.SECRET_KEY
const secretKey = "secretKey"

const getToken = (payload) => {
    return jwt.sign(payload, secretKey)
}

const getPayload = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = {
    getToken,
    getPayload
}