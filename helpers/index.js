const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = process.env.SECRET_KEY;

function hashPassword(password) {
    return bcrypt.hashSync(password, 10)
}

function verifyPassword(input, password) {
    return bcrypt.compareSync(input, password)
}
function addToken(payload) {
    return jwt.sign(payload, key)
}
function verifyTokenData(data) {
    return jwt.verify(data, key)
}
module.exports = {
    hashPassword,
    verifyPassword,
    addToken,
    verifyTokenData
}