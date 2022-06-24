const marvel = require('express').Router()
const marvel_controller = require('../controllers/marvelController')
const user_controller = require('../controllers/userController')


marvel.post('/register', user_controller.register)
marvel.post('/login', user_controller.login)
marvel.post('/login-google', user_controller.googleLogin)

marvel.get(`/characters`, marvel_controller.getCharacters)
marvel.get(`/comics`, marvel_controller.getComics)
marvel.get('/new-comics', marvel_controller.newComics)
marvel.get(`/comics/:characterId`, marvel_controller.getDetail)


module.exports = marvel