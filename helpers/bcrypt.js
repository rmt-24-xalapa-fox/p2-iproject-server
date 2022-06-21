const bcrypt = require("bcryptjs");

function hash(password) {
    return bcrypt.hashSync(password, 8)
}

function compareHash(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = { hash, compareHash };