const bcrypt = require('bcrypt');;

const hashPass = (password)=>{
    return bcrypt.hashSync(password,10);
}

const comparePass = (password,hashed)=>{
    return bcrypt.compareSync(password,hashed);
}

module.exports={hashPass,comparePass};