const bcrypt = require('bcryptjs');


function hashPassword(password){
    return bcrypt.hashSync(password.toString())
}

function comparedPassword(inputPassword, databasePassword){
    return bcrypt.compareSync(inputPassword, databasePassword)
}




module.exports = {hashPassword, comparedPassword}