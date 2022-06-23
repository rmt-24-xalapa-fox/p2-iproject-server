const router = require("express").Router()
const ControllerPokemon = require("../controllers/controllerpokemon")

// route here
router.get('/', ControllerPokemon.getStarterPokemons)
router.get('/map', ControllerPokemon.generateMap)
router.post('/next', ControllerPokemon.getNextEnemy)
router.get('/random', ControllerPokemon.getNextRandomEnemy)
router.get('/boss', ControllerPokemon.getNextBossEnemy)

module.exports = router