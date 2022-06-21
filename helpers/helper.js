const bcrypt = require('bcrypt')

const jwt = require("jsonwebtoken")

const hashingPass = (plaintext) => bcrypt.hashSync(plaintext, 8)
const compareHashWithPass = (plaintext, hash) => bcrypt.compareSync(plaintext, hash)

const createToken = (payload) => jwt.sign(payload, process.env.secretKey)
const readPayload = (token) => jwt.verify(token, process.env.secretKey)

module.exports = {
    hashingPass,
    compareHashWithPass,
    createToken,
    readPayload
} 