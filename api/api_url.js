const axios = require("axios");

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    timeout: 1500,
});

module.exports = instance;