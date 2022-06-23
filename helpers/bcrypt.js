"use strict";
const bcrypt = require("bcryptjs");
const hash = (password) => {
    return bcrypt.hashSync(password, 10);
};

const compare = (hashed, password) => {
    return bcrypt.compareSync(hashed, password);
};

module.exports = {
    hash, compare
};