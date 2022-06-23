"use strict";

const { Bookmark, Customer } = require('../models');
const authorization = async (req, res, next) => {
    try {
        const { id: custId } = req.cust;
        const { id: bookmarkId } = req.params;
        if (bookmarkId) {
            const foundBookmark = await Bookmark.findOne({
                where: {
                    id: +bookmarkId
                }
            });

            if (foundBookmark.CustomerId !== custId) {
                throw { name: 'Forbidden' };
            }
        }
        next();

    } catch (err) {
        next(err);
    }
};


module.exports = authorization;