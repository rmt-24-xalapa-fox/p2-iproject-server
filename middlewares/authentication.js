const {verifytoken} = require('../helpers/helper')
const {User, Company} = require('../models')

const authentication = async (req, res, next)=>{
    try{
        const { access_token } = req.headers
        if(!access_token){
            throw {name: "InvalidToken"}
        }
        const payload = verifytoken(access_token)
        const user = await User.findByPk(payload.userId)
        const company = await Company.findByPk(payload.userId)
        if(!user&&!company){
            throw {name: "InvalidToken"}
        }
        req.userId = user.id||company.id
        next()
    }catch(err){
        next(err)
    }
}

module.exports = authentication