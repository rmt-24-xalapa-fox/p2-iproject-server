const { Item } = require("../models")
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
        method: "GET",
        headers: {
          'X-RapidAPI-Key': RapidAPIKey,
          'X-RapidAPI-Host': 'pokemon-go1.p.rapidapi.com'
        }
      }

      // fetch move for each starters
      options.url = 'https://pokemon-go1.p.rapidapi.com/pokemon_stats.json'
      
      const { data:recv_stats } =  await axios.request(options)

      // pokemon moves
      options.url = 'https://pokemon-go1.p.rapidapi.com/current_pokemon_moves.json'
      
      const { data:recv_moves } =  await axios.request(options)      

      // moves info
      options.url = 'https://pokemon-go1.p.rapidapi.com/fast_moves.json'

      const { data:recv_fast } =  await axios.request(options)      

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

      const items = await Item.findAll({
        attributes: {
          exlude: ["createdAt", "updatedAt"]
        }
      })

      // console.log("ITEMS",items);

      res.status(200).json({
        pokemons:starters,
        items:items,
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async generateMap(req, res, next){
    try {      
      const grouptier = require("../data/groups.json")
      // console.log(grouptier);
      const enemymaps = []
      for (let i = 0; i < 20; i++) {
        const tier = Math.floor(i/5)
        enemymaps.push([])
        while (enemymaps[i].length<2) {
          const rng = Math.floor(Math.random()*grouptier[tier].length)
          if(grouptier[tier][rng]!==enemymaps[i][0]){
            enemymaps[i].push(grouptier[tier][rng])
          }
        }
      }
      // console.log(enemymaps);
      res.status(200).json(enemymaps)
    } catch (error) {
      // console.log(error);
      next(error)
    }
  }

  static async getNextRandomEnemy(req, res, next){
    try {
      const pokemons = []
      let options = {
        method: "GET",
        headers: {
          'X-RapidAPI-Key': RapidAPIKey,
          'X-RapidAPI-Host': 'pokemon-go1.p.rapidapi.com'
        }
      }

      options.url = 'https://pokemon-go1.p.rapidapi.com/pokemon_stats.json'
      
      const { data:recv_stats } =  await axios.request(options)

      // pokemon moves
      options.url = 'https://pokemon-go1.p.rapidapi.com/current_pokemon_moves.json'
      
      const { data:recv_moves } =  await axios.request(options)      

      // moves info
      options.url = 'https://pokemon-go1.p.rapidapi.com/fast_moves.json'

      const { data:recv_fast } =  await axios.request(options)      

      options.url = 'https://pokemon-go1.p.rapidapi.com/charged_moves.json'

      const { data:recv_charged } =  await axios.request(options)      

      
      // send data contains id name stats move
      // stats
      while (pokemons.length<2) {
        const random = Math.floor(Math.random() * recv_stats.length);
        if(recv_stats[random].pokemon_id !== pokemons[0].id && recv_stats[random].pokemon_id != 132){
          const poke = {}
          const pokemon = recv_stats[random]
          poke.id = recv_stats[random].pokemon_id
          poke.attack= pokemon.base_attack
          poke.defense = pokemon.base_defense
          poke.hp = pokemon.base_stamina
          poke.name = pokemon.pokemon_name
          pokemons.push(poke)
        }
      }

      // moves
      pokemons.forEach(p => {
        const pokemon = recv_moves.find( s => s.pokemon_id===p.id && s.form==='Normal' )        
        p.moves = getMoves(pokemon, { fast:recv_fast , charged:recv_charged })
      });

      // console.log("ITEMS",items);

      res.status(200).json(pokemons)
    } catch (error) {
      next(error)
    }
  }

  static async getNextBossEnemy(req, res, next){
    try {
      const pokemons = []
      let options = {
        method: "GET",
        headers: {
          'X-RapidAPI-Key': RapidAPIKey,
          'X-RapidAPI-Host': 'pokemon-go1.p.rapidapi.com'
        }
      }

      options.url = 'https://pokemon-go1.p.rapidapi.com/pokemon_stats.json'
      
      const { data:recv_stats } =  await axios.request(options)

      // pokemon moves
      options.url = 'https://pokemon-go1.p.rapidapi.com/current_pokemon_moves.json'
      
      const { data:recv_moves } =  await axios.request(options)      

      // moves info
      options.url = 'https://pokemon-go1.p.rapidapi.com/fast_moves.json'

      const { data:recv_fast } =  await axios.request(options)      

      options.url = 'https://pokemon-go1.p.rapidapi.com/charged_moves.json'

      const { data:recv_charged } =  await axios.request(options)      

      
      // send data contains id name stats move
      // stats
      while (pokemons.length<2) {
        const random = getLegendary()
        const pokemon = recv_stats.find( s => s.pokemon_id===p && s.form==='Normal' ) 
        if(recv_stats[random].pokemon_id !== pokemons[0].id && recv_stats[random].pokemon_id != 132){
          const poke = {}
          poke.id = recv_stats[random].pokemon_id
          poke.attack= pokemon.base_attack
          poke.defense = pokemon.base_defense
          poke.hp = pokemon.base_stamina
          poke.name = pokemon.pokemon_name
          pokemons.push(poke)
        }
      }

      // moves
      pokemons.forEach(p => {
        const pokemon = recv_moves.find( s => s.pokemon_id===p.id && s.form==='Normal' )        
        p.moves = getMoves(pokemon, { fast:recv_fast , charged:recv_charged })
      });

      // console.log("ITEMS",items);

      res.status(200).json(pokemons)
    } catch (error) {
      next(error)
    }
  }

  static async getNextEnemy(req, res, next){
    try {
      const { map } = req.body
      // console.log("BODY", req.body);
      // console.log(map);
      const pokemons = []
      let options = {
        method: "GET",
        headers: {
          'X-RapidAPI-Key': RapidAPIKey,
          'X-RapidAPI-Host': 'pokemon-go1.p.rapidapi.com'
        }
      }

      options.url = 'https://pokemon-go1.p.rapidapi.com/pokemon_stats.json'
      
      const { data:recv_stats } =  await axios.request(options)

      // pokemon moves
      options.url = 'https://pokemon-go1.p.rapidapi.com/current_pokemon_moves.json'
      
      const { data:recv_moves } =  await axios.request(options)      

      // moves info
      options.url = 'https://pokemon-go1.p.rapidapi.com/fast_moves.json'

      const { data:recv_fast } =  await axios.request(options)      

      options.url = 'https://pokemon-go1.p.rapidapi.com/charged_moves.json'

      const { data:recv_charged } =  await axios.request(options)      

      
      // send data contains id name stats move
      // stats
      map.forEach(p => {
        const poke = {}
        const pokemon = recv_stats.find( s => s.pokemon_id===p && s.form==='Normal' ) 
        poke.id = p       
        poke.attack= pokemon.base_attack
        poke.defense = pokemon.base_defense
        poke.hp = pokemon.base_stamina
        poke.name = pokemon.pokemon_name
        pokemons.push(poke)
      });

      // moves
      pokemons.forEach(p => {
        const pokemon = recv_moves.find( s => s.pokemon_id===p.id && s.form==='Normal' )        
        p.moves = getMoves(pokemon, { fast:recv_fast , charged:recv_charged })
      });

      res.status(200).json(pokemons)

    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  
}

module.exports = ControllerPokemon