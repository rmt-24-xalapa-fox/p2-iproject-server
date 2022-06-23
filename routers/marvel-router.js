const marvel = require('express').Router()
const marvel_controller = require('../controllers/marvelController')
// const marvelController = 

marvel.get(`/characters`, marvel_controller.getCharacters)
marvel.get(`/comics`, marvel_controller.getComics)
marvel.get('/new-comics', marvel_controller.newComics)
marvel.get(`/comics/:characterId`, marvel_controller.getDetail)





module.exports = marvel