const {verifytoken} = require('../helpers/helper')
const {User} = require('../models')

const authentication = async (req, res, next)=>{
    try{
        const { access_token } = req.headers
        if(!access_token){
            throw {name: "InvalidToken"}
        }
        const payload = verifytoken(access_token)
        const user = await User.findByPk(payload.userId)
        if(!user){
            throw {name: "InvalidToken"}
        }
        req.userId = user.id
        next()
    }catch(err){
        next(err)
    }
}

module.exports = authentication