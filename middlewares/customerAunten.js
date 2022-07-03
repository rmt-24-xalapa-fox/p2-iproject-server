"use strict"

const {Customer} = require("../models/index")
const {readPayload} = require("../helper/jwt")
const customerAuthen = async (req, res, next) => {
    try{
        const {token} = req.headers;
        
        if(!token){
            throw { name: "InvalidToken"}
        }

        const payload = readPayload(token)
        const { id } = payload
        const customer = await Customer.findByPk(+id)
        if(!user){
            throw { name: "InvalidToken"}
        }

        req.customer = {
            id: customer.id,
            email: customer.email
        }
        
    next()
    } catch(err){
        next(err)
    }
}

module.exports = customerAuthen