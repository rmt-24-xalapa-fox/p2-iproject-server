// const isPwCorrect = require("../helpers/cryptpw")
const { convertToken } = require("../helpers/jwt")

const authentication = async (req, res, next) => {
  try {
    // check token
    const { access_token } = req.headers

    if(!access_token) {
      throw { name: "ErrorInvalidToken" , msg: "Invalid token" }
    }

    // convert token to payload
    const payload = convertToken(access_token)

    if(!payload) {
      throw { name: "ErrorInvalidToken" , msg: "Token Expired, please re-login" }
    }

    // CHECK DB AGAIN AFTER GET PAYLOAD

    const { User } = require("../models")

    const validuser = await Client.findOne({
      where: {
        id: payload.id,
        email: payload.email,
      }
    })

    if(!validuser){
      throw { name: "ErrorInvalidToken" , msg: "Invalid token" }
    }
    
    req.user = {
      id: validuser.id,
    }

    next()
  }
  catch(err) {
    next(err)
  }
}

module.exports = authentication