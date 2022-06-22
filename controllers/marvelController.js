'use strict'
const axios = require('axios')
const apikey = process.env.PUBLIC_KEY
const hash = process.env.HASH
const ts = process.env.TS
const url = process.env.URL

class MarvelController {
    static async getCharacters(req, res, next) {
        try {
            const { page = 1, name = 'A' } = req.query
            const limit = 50
            const offset = (page - 1) * limit

            const { data } = await axios.get(`${url}/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=${limit}&offset=${offset}&nameStartsWith=${name}`)

            res.status(200).json(
                data
            )
        } catch (error) {
            console.log(error);
        }
    }

    static async getComics(req, res, next) {
        try {
            let { page, year } = req.query
            if (!page) {
                page = 1
            }
            const limit = 20
            const offset = (page - 1) * limit

            if (!year || year === '') {
                year = 2022
            }

            const { data } = await axios.get(`${url}/comics?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=${limit}&offset=${offset}&startYear=${year}`)

            res.status(200).json(
                data
            )
        } catch (error) {
            console.log(error);
        }
    }

    static async newComics(req, res, next) {
        try {
            const page = 1
            const year = 2022
            const limit = 10
            const offset = (page - 1) * limit

            const { data } = await axios.get(`${url}/comics?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=${limit}&offset=${offset}&startYear=${year}`)

            res.status(200).json(
                data
            )
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = MarvelController