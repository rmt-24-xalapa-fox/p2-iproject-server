const marvel = require('express').Router()
const marvel_controller = require('../controllers/marvelController')
// const marvelController = 

marvel.get(`/characters`, marvel_controller.getCharacters)
// marvel.get(`/characters/:characterId`, marvel_controller.getDetailCharacter)
marvel.get(`/comics`, marvel_controller.getComics)
marvel.get('/new-comics', marvel_controller.newComics)





module.exports = marvel