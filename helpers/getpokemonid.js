// up to gen 7
const starters = require('../data/starters.json')
const legendaries = require('../data/legendaries.json')
const mythics = require('../data/mythics.json')

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

  return [{id:starters.Grass[rng[0]]}, {id:starters.Fire[rng[1]]}, {id:starters.Water[rng[2]]}]
}

function getLegendary() {
  return legendaries[getRandomInt(legendaries.length)]
}

function getMythic() {
  return mythics[getRandomInt(mythics.length)]
}

function getMoves(pokemon, movepools) {
  const moves = []
  
  // select random fast
  const fast = pokemon.fast_moves[getRandomInt(pokemon.fast_moves.length)]
  const fast_move = movepools.fast.find( m => m.name === fast )
  moves.push({
    id: fast_move.move_id,
    name: fast_move.name,
    power: fast_move.power,
    type: fast_move.type,
  })

  const charged = pokemon.charged_moves[getRandomInt(pokemon.charged_moves.length)]
  const charged_move = movepools.fast.find( m => m.name === fast )
  moves.push({
    id: charged_move.move_id,
    name: charged_move.name,
    power: charged_move.power,
    type: charged_move.type,
  })

  return moves
    
} 

module.exports = { getStarters, getLegendary, getMythic, getMoves }