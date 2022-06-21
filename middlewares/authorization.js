"use strict";

const { News } = require("../models/index");

// if admin, bypass.
// if staff, check.

const authorization = async (req, res, next) => {
    try {
        if (req.user.role === "Admin") {
            next();
        } else if (req.user.role === "Staff") {
            const { id: UserId } = req.user;
            const { id: authorId } = req.params;

            if (!Number(authorId)) {
                throw { code: 400 };
            }
            const news = await News.findByPk(authorId);

            if (!news) {
                throw { code: 404 };
            }

            if (UserId !== news.authorId) {
                throw { code: 403 };
            }

            next();
        }
    } catch (error) {
        next(error);
    }
};

const authorizationAdminOnly = async (req, res, next) => {
    try {
        if (req.user.role === "Admin") {
            next();
        } else {
            throw { code: 403 };
        }
    } catch (err) {
        next(err);
    }
};

const authorizationCustomerOnly = async (req, res, next) => {
    try {
        if (req.user.role === "Customer") {
            next();
        } else {
            throw { code: 403 };
        }
    } catch (err) {
        next(err);
    }
};
module.exports = { authorization, authorizationAdminOnly, authorizationCustomerOnly };
