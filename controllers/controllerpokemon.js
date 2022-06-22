const { getStarters, getMoves, getLegendary, getMythic } = require("../helpers/getpokemonid")
const axios = require("axios");
const RapidAPIKey = process.env.RapidAPIKey;

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

  static async getStarterPokemons(req, res, next){
    try {
      const starters = getStarters()
      let options = {
        headers: {
          'X-RapidAPI-Key': RapidAPIKey,
          'X-RapidAPI-Host': 'pokemon-go1.p.rapidapi.com'
        }
      }

      // fetch info for each starters

      // fetch move for each starters
      options.method = 'GET'
      options.url = 'https://pokemon-go1.p.rapidapi.com/pokemon_stats.json'
      
      const { data:recv_stats } =  await axios.request(options)

      // pokemon moves
      options.method = 'GET'
      options.url = 'https://pokemon-go1.p.rapidapi.com/current_pokemon_moves.json'
      
      const { data:recv_moves } =  await axios.request(options)      

      // moves info
      options.method = 'GET'
      options.url = 'https://pokemon-go1.p.rapidapi.com/fast_moves.json'

      const { data:recv_fast } =  await axios.request(options)      

      options.method = 'GET'
      options.url = 'https://pokemon-go1.p.rapidapi.com/charged_moves.json'

      const { data:recv_charged } =  await axios.request(options)      

      
      // send data contains id name stats move
      // stats
      starters.forEach(p => {
        const pokemon = recv_stats.find( s => s.pokemon_id===p.id && s.form==='Normal' )        
        p.attack= pokemon.base_attack
        p.defense = pokemon.base_defense
        p.hp = pokemon.base_stamina
        p.name = pokemon.pokemon_name
      });

      // moves
      starters.forEach(p => {
        const pokemon = recv_moves.find( s => s.pokemon_id===p.id && s.form==='Normal' )        
        p.moves = getMoves(pokemon, { fast:recv_fast , charged:recv_charged })
      });

      res.status(200).json(starters)      
    } catch (error) {
      console.log(error);
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