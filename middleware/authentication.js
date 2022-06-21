"use strict"

const { verifyTokenData } = require("../helpers/index")
const { User } = require("../models/index")


const authenticationUser = async (req, res, next) => {
    try {
        const access_token = req.headers.access_token;
        if (!access_token) {
            throw { name: "Invalid Customer Token" }
        }

        const customerPayload = verifyTokenData(access_token)
        const id = customerPayload.id
        const foundCustomer = await User.findByPk(id)

        if (!foundCustomer) {
            throw new Error("Invalid Customer Token");
        }

        req.user = {
            id: foundCustomer.id,
            email: foundCustomer.email,
            username: foundCustomer.username
        }
        next();
    } catch (err) {
        next(err)
    }
}


module.exports = authenticationUser