"use strict";

const { Product, User } = require('../models');
const authorization = async (req, res, next) => {
    try {
        const { id: userId, role } = req.user;
        const { id: productId } = req.params;
        if (productId) {
            const foundProduct = await Product.findOne({
                where: {
                    id: +productId
                }
            });

            if (role !== 'Admin') {
                throw { name: "Not authorized" };
            }
        }
        next();
    } catch (err) {
        // next(err);
        console.log(err);
    }
};


module.exports = authorization;