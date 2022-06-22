const marvel = require('express').Router()
const marvel_controller = require('../controllers/marvelController')
const apikey = process.env.PUBLIC_KEY
const hash = process.env.HASH
const ts = process.env.TS
// const marvelController = 

marvel.use(`/characters`, marvel_controller.getCharacters)
marvel.use(`/comics`, marvel_controller.getComics)
marvel.use('/new-comics', marvel_controller.newComics)





module.exports = marvel