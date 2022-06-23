const jwt = require(`jsonwebtoken`)

const secretKey = process.env.SECRET_KEY

const convertPayloadToToken = (payload) =>{
    return jwt.sign(payload,secretKey,{
        expiresIn:`1h`
    })
}

const convertTokenToPayload = (token) =>{
    return jwt.verify(token,secretKey)
}

module.exports = {
    convertPayloadToToken,
    convertTokenToPayload
}