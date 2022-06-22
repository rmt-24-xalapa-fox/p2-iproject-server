const router = require("express").Router()
const ControllerPokemon = require("../controllers/controllerpokemon")

// route here
router.get('/', ControllerPokemon.getStarterPokemons)
router.get('/map', ControllerPokemon.generateMap)

module.exports = router