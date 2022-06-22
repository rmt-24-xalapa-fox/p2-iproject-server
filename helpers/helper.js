const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function createpassword(password){
    return bcrypt.hashSync(password, 10)
}

function verifypassword(password, hash){
    return bcrypt.compareSync(password, hash)
}

function signtoken(payload){
    return jwt.sign(payload, process.env.SECRET_KEY)
}

function verifytoken(token){
    return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = {createpassword, verifypassword, signtoken, verifytoken}