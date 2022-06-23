const jwt = require('jsonwebtoken');

const secret=process.env.secretKey||"secret";


const payloadToToken = (payload)=>{
    return jwt.sign(payload,secret)
}

const tokenToPayload = (token)=>{
    return jwt.verify(token,secret);
}

module.exports={payloadToToken,tokenToPayload};