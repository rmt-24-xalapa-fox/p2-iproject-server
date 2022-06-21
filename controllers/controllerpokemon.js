const { getStarters, getLegendary, getmythic } = require("../helpers/getpokemonid")

class ControllerPokemon {
  
  static async getPokemonInfo(id){
    try {
      // get: id name stats move
      
    } catch (error) {
      next(error)
    }
  }

  static async getPokemonMoves(id){
    try {
      // get: id name power
      
    } catch (error) {
      next(error)
    }
  }

  static async getStarters(req, res, next){
    try {
      const starterid = getStarters()
      // fetch info for each starters

      // fetch move for each starters

      // send data contains id name stats move
      res.status(200).json(data)      
    } catch (error) {
      next(error)
    }
  }

  static async generateMap(req, res, next){
    try {
      // 
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerPokemon