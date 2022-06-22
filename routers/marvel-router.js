const marvel = require('express').Router()
const marvel_controller = require('../controllers/marvelController')
// const marvelController = 

marvel.use(`/characters`, marvel_controller.getCharacters)
marvel.use(`/comics`, marvel_controller.getComics)
marvel.use('/new-comics', marvel_controller.newComics)





module.exports = marvel