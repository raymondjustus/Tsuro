const { Path, Position, Tile } = require('../Common');
const { DIRECTIONS } = require('../Common/constants');

/**
 * Checks to see if the given tile is in the tile list
 * @param {Tile[]} tileList
 * @param {Tile} tile
 */
const tileRepetitionCheck = (tileList, tile) => {
  for (let i = 0; i < tileList.length; i++) {
    if (tile.isEqualToRotated(tileList[i])) {
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
    if (tile.isEqualTo(tileList[i])) {
      return false;
    }
  }
  return true;
};

/**
 * Creates one version of each 35 possible tiles for the game Tsuro
 */
const allTiles = () => {
  const foundTiles = [];
  const zero = new Position(DIRECTIONS.NORTH, 0);
  const one = new Position(DIRECTIONS.NORTH, 1);
  const two = new Position(DIRECTIONS.EAST, 0);
  const three = new Position(DIRECTIONS.EAST, 1);
  const four = new Position(DIRECTIONS.SOUTH, 0);
  const five = new Position(DIRECTIONS.SOUTH, 1);
  const six = new Position(DIRECTIONS.WEST, 0);
  const seven = new Position(DIRECTIONS.WEST, 1);

  for (let i = 0; i < 7; i++) {
    const portOptions = [one, two, three, four, five, six, seven];
    const startFirst = zero;
    const endFirst = portOptions.splice(i, 1).shift();
    for (let j = 0; j < 5; j++) {
      const startSecond = portOptions.shift();
      const endSecond = portOptions.splice(j, 1).shift();
      for (let k = 0; k < 3; k++) {
        const startThird = portOptions.shift();
        const endThird = portOptions.splice(k, 1).shift();
        const startFourth = portOptions.shift();
        const endFourth = portOptions.shift();
        const layout = [
          new Path(startFirst, endFirst),
          new Path(startSecond, endSecond),
          new Path(startThird, endThird),
          new Path(startFourth, endFourth),
        ];

        const temporary = new Tile(layout);
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

  const simpleScrub = [];
  foundTiles.forEach(tile => {
    if (simpleRepetitionCheck(simpleScrub, tile)) {
      simpleScrub.push(tile);
    }
  });

  const lastList = [];
  while (simpleScrub.length > 0) {
    const tile = simpleScrub.pop();
    if (tileRepetitionCheck(lastList, tile)) {
      lastList.push(tile);
    }
  }

  let n = 0;
  lastList.forEach(tile => {
    const s = `tile-${n}`;
    n += 1;
    tile.renderToFile(s);
  });
};

module.exports = allTiles;
