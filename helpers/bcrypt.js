const bcrypt = require("bcryptjs")

const hash = (password) => {
    return bcrypt.hashSync(password, 8)
}

const compare = (passwordInput, passwordFound) => {
    return bcrypt.compareSync(passwordInput, passwordFound)
}

module.exports = {
    hash,
    compare
}

// console.log(hash("12345"))