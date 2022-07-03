"use strict";
const jwt = require("jsonwebtoken");
const key = "RHS";
const payToToken = (sentPayload) => {
    return jwt.sign(sentPayload, key);
};
const tokenToPay = (accesToken) => {
    return jwt.verify(accesToken, key);
};

module.exports = {
    payToToken, tokenToPay
};