"use strict"
const {Staff} = require("../models")
const {readPayload} = require("../helper/jwt")
const authentication = async (req, res, next) => {
    try{
        const {token} = req.headers;
        
        if(!token){
            throw { name: "InvalidToken"}
        }

        const payload = readPayload(token)
        const { id } = payload
        const staff = await Staff.findByPk(+id)
        if(!user){
            throw { name: "InvalidToken"}
        }

        req.staff = {
            id: staff.id,
            email: staff.email,
            role: staff.role
        }
        
    next()
    } catch(err){
        next(err)
    }
}

module.exports = authentication