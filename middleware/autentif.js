const { verifiedToken } = require("../helps/help.js")
const {User} = require("../models/index.js")


const authentif = async (req, res, next) =>{
    try {
        const {access_token} = req.headers

        const payload = verifiedToken(access_token)

        const userLogged = await User.findOne({
            where:{
                id: payload.id,
                email: payload.email,
            }
        })

        if(!userLogged) {
            throw({name: "JsonWebTokenError"})
        }

        req.user = {
            id: userLogged.id,
            email: userLogged.email,
            status: userLogged.status
        }
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    authentif
}