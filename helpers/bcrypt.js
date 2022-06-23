const bcryptBuiltIn = require('bcryptjs')

const bcryptCompareSync = (dataBasePass, inputtedPass) => {
    return bcryptBuiltIn.compareSync(
        dataBasePass, inputtedPass)
}
const bcryptHashSync = (password) => {
    return bcryptBuiltIn.hashSync(
        password, 10)
}


module.exports = { bcryptCompareSync, bcryptHashSync }