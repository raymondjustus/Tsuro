const Tile = require('../Common/tiles');
const Position = require('../Common/position');
const Path = require('../Common/path');
const { DIRECTIONS } = require('../Common/constants');

/**
 * Checks to see if the given tile is in the tile list
 * @param {Tile[]} tileList
 * @param {Tile} tile
 */
const tileRepetitionCheck = (tileList, tile) => {
  for (let i = 0; i < tileList.length; i++) {
    if (tile.checkRotationalEquality(tileList[i])) {
      return false;
    }
  }
  return true;
};

/**
 * Checks to see if the given tile is in the tile list, does not check for rotation equality
 * @param {Tile[]} tileList
 * @param {Tile} tile
 */
const simpleRepetitionCheck = (tileList, tile) => {
  for (let i = 0; i < tileList.length; i++) {
    if (tile.checkTileEquality(tileList[i])) {
      return false;
    }
  }
  return true;
};

/**
 * Creates one version of each 35 possible tiles for the game Tsuro
 */
const allTiles = () => {
  let foundTiles = [];
  let zero = new Position(DIRECTIONS.NORTH, 0);
  let one = new Position(DIRECTIONS.NORTH, 1);
  let two = new Position(DIRECTIONS.EAST, 0);
  let three = new Position(DIRECTIONS.EAST, 1);
  let four = new Position(DIRECTIONS.SOUTH, 0);
  let five = new Position(DIRECTIONS.SOUTH, 1);
  let six = new Position(DIRECTIONS.WEST, 0);
  let seven = new Position(DIRECTIONS.WEST, 1);

  for (let i = 0; i < 7; i++) {
    let portOptions = [one, two, three, four, five, six, seven];
    let startFirst = zero;
    let endFirst = portOptions.splice(i, 1).shift();
    for (let j = 0; j < 5; j++) {
      let startSecond = portOptions.shift();
      let endSecond = portOptions.splice(j, 1).shift();
      for (let k = 0; k < 3; k++) {
        let startThird = portOptions.shift();
        let endThird = portOptions.splice(k, 1).shift();
        let startFourth = portOptions.shift();
        let endFourth = portOptions.shift();
        let layout = [
          new Path(startFirst, endFirst),
          new Path(startSecond, endSecond),
          new Path(startThird, endThird),
          new Path(startFourth, endFourth),
        ];

        let temporary = new Tile(layout);
        foundTiles.push(temporary);

        portOptions.unshift(endFourth);
        portOptions.unshift(startFourth);
        portOptions.unshift(endThird);
        portOptions.unshift(startThird);
      }
      portOptions.unshift(endSecond);
      portOptions.unshift(startSecond);
    }
    portOptions.unshift(endFirst);
    portOptions.unshift(startFirst);
  }

  let simpleScrub = [];
  foundTiles.forEach(tile => {
    if (simpleRepetitionCheck(simpleScrub, tile)) {
      simpleScrub.push(tile);
    }
  });

  let lastList = [];
  while (simpleScrub.length > 0) {
    let tile = simpleScrub.pop();
    if (tileRepetitionCheck(lastList, tile)) {
      lastList.push(tile);
    }
  }

  let n = 0;
  lastList.forEach(tile => {
    let s = 'tile-' + n;
    n += 1;
    tile.renderToFile(s);
  });
};

module.exports = allTiles;
