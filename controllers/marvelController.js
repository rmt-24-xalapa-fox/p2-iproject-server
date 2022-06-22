'use strict'
const axios = require('axios')
const apikey = process.env.PUBLIC_KEY
const hash = process.env.HASH
const ts = process.env.TS
const url = process.env.URL

class MarvelController {
    static async getCharacters(req, res, next) {
        try {
            const { data } = await axios.get(`${url}/characters?ts=${ts}&apikey=${apikey}&hash=${hash}`)
            // console.log(data);

            res.status(200).json(
                data
            )
        } catch (error) {
            console.log(error);
        }
    }

    static async getComics(req, res, next) {
        try {
            const { data } = await axios.get(`${url}/comics?ts=${ts}&apikey=${apikey}&hash=${hash}`)

            res.status(200).json(
                data
            )
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = MarvelController