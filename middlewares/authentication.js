"use strict";

const { tokenToPay } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw { name: 'Invalid Token' };
        }

        const payload = tokenToPay(access_token);
        const { id } = payload;

        const foundUser = await User.findByPk(id);
        if (!foundUser) {
            throw { name: 'Invalid Token' };
        }

        req.user = {
            id: foundUser.id,
            name: foundUser.name,
            role: foundUser.role
        };
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports = authentication;