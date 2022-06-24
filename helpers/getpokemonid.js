// up to gen 7
const starters = require('../data/starters.json')
const legendaries = require('../data/legendaries.json')
const mythics = require('../data/mythics.json')
const standards = require("../data/standards.json")

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getStarters() {
  const rng = []
  // scuffed random uniform
  let counter = 0;
  while (counter<3) {
    const num = getRandomInt(starters.Grass.length)
    if(rng.indexOf(num)<0){
      rng.push(num)
      counter++
    }
    // // failsafe
    // if(counter===3) break;
  }

  return [{id:132}, {id:starters.Grass[rng[0]]}, {id:starters.Fire[rng[1]]}, {id:starters.Water[rng[2]]}]
}

function getLegendary() {
  let lindex = []
  while (lindex.length<3) {
    const rng = getRandomInt(legendaries.length)
    if(rng !== lindex[0]){
      lindex.push(rng)
    }
  }

  const legens = lindex.map( l => {
    return legendaries[l]    
  });

  return legens

}

function getMythic() {
  return mythics[getRandomInt(mythics.length)]
}

function getRandomPokemons() {
  const pokemons = []

  while (pokemons.length<2) {
    const chance = Math.random()
    let id
  
    if(chance<0.1){
      id = legendaries[getRandomInt(legendaries.length)]
    }
    else if (chance< 0.3){
      id = mythics[getRandomInt(mythics.length)]
    }
    else {
      id = standards[getRandomInt(standards.length)]
    }

    if(id!==132){
      pokemons.push(id)
    }
    
  }

  return pokemons
}

function getMoves(pokemon, movepools) {
  const moves = []
  
  // select random fast
  const fast = pokemon.fast_moves[getRandomInt(pokemon.fast_moves.length)]
  const fast_move = movepools.fast.find( m => m.name === fast )
  moves.push({
    id: fast_move.move_id,
    name: fast_move.name,
    power: 20+Math.ceil(fast_move.power*2.5),
    type: fast_move.type,
  })

  const charged = pokemon.charged_moves[getRandomInt(pokemon.charged_moves.length)]
  const charged_move = movepools.charged.find( m => m.name === charged )
  moves.push({
    id: charged_move.move_id,
    name: charged_move.name,
    power: charged_move.power,
    type: charged_move.type,
  })

  return moves
    
} 

module.exports = { getStarters, getLegendary, getRandomPokemons, getMoves }