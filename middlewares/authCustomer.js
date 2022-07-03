"use strict";

const { tokenToPay } = require('../helpers/jwt');
const { Customer } = require('../models');

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw { name: 'Invalid Token' };
        }

        const payload = tokenToPay(access_token);
        const { id } = payload;

        const foundCust = await Customer.findByPk(id);
        if (!foundCust) {
            throw { name: 'Invalid Token' };
        }

        req.cust = {
            id: foundCust.id,
            name: foundCust.name
        };
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authentication;