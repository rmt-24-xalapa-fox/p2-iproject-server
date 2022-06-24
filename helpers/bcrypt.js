'use strict'

const bcrypt = require('bcryptjs')

const hasPassword = (password) => {
    return bcrypt.hashSync(password, 8)
}

const comparePass = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hasPassword,
    comparePass
}