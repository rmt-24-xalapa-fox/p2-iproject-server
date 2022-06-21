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

  return {grass:starters.Grass[rng[0]], fire:starters.Fire[rng[1]], water:starters.Water[rng[2]]}
}

function getLegendary() {
  return legendaries[getRandomInt(legendaries.length)]
}

function getmythic() {
  return mythics[getRandomInt(mythics.length)]
}

module.exports = { getStarters, getLegendary, getmythic }