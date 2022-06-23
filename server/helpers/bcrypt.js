const bcrypt = require('bcryptjs');

function hashPassword(password) {
    return bcrypt.hashSync(password, 8);
}

function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {hashPassword, checkPassword}