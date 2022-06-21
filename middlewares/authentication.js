const { User } = require('../models')
const { verifyToken } = require("../helpers/token");

async function authentication(req, res, next){
    try {
        const { access_token } = req.headers;
        console.log(req.headers);
        console.log(
          access_token,
          "<<<<<<<<<<<<<<<<<< accesstoken di authentication"
        );

        if (!access_token) {
          throw { name: "InvalidToken" };
        }

        const payload = verifyToken(access_token);
        
        const { id } = payload

        const user = await User.findByPk(+id)

        if (!user){
            throw { name: "UserNotFound" };
        }
        
        req.user = {
            id: user.id,
            role: user.role,
            username: user.username
        }

        next()
    } catch (err) {
        console.log(err);
        next(err)
    }
}


module.exports = authentication;