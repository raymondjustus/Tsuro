const { Path, Position, Tile } = require('../Common');
const { DIRECTIONS, PORTS } = require('../Common/utils/constants');

/**
 * Checks to see if the given tile exists alredy in the tile list.
 *
 * @param {Tile} tile the tile to check
 * @param {Tile[]} tileList the list of tiles to check repitition against
 * @param {boolean} [checkForRotations=false] whether to check for equality,
 * regardless of orientation
 */
const checkForTileRepitition = (tile, tileList, checkForRotations = false) =>
  tileList.every(tileItem => {
    if (checkForRotations) {
      return !tile.isEqualToRotated(tileItem);
    }
    return !tile.isEqualTo(tileItem);
  });

/**
 * Creates one version of each 35 possible tiles for the game Tsuro
 */
const allTiles = () => {
  const foundTiles = [];
  const zero = new Position(DIRECTIONS.NORTH, PORTS.ZERO);
  const one = new Position(DIRECTIONS.NORTH, PORTS.ONE);
  const two = new Position(DIRECTIONS.EAST, PORTS.ZERO);
  const three = new Position(DIRECTIONS.EAST, PORTS.ONE);
  const four = new Position(DIRECTIONS.SOUTH, PORTS.ZERO);
  const five = new Position(DIRECTIONS.SOUTH, PORTS.ONE);
  const six = new Position(DIRECTIONS.WEST, PORTS.ZERO);
  const seven = new Position(DIRECTIONS.WEST, PORTS.ONE);

  for (let i = 0; i < 7; i++) {
    const positions = [one, two, three, four, five, six, seven];
    const startFirst = zero;
    const endFirst = positions.splice(i, 1).shift();
    for (let j = 0; j < 5; j++) {
      const startSecond = positions.shift();
      const endSecond = positions.splice(j, 1).shift();
      for (let k = 0; k < 3; k++) {
        const startThird = positions.shift();
        const endThird = positions.splice(k, 1).shift();
        const startFourth = positions.shift();
        const endFourth = positions.shift();

        const tempTile = new Tile([
          new Path(startFirst, endFirst),
          new Path(startSecond, endSecond),
          new Path(startThird, endThird),
          new Path(startFourth, endFourth),
        ]);

        if (checkForTileRepitition(tempTile, foundTiles, true)) {
          foundTiles.push(tempTile);
        }

        positions.unshift(endFourth);
        positions.unshift(startFourth);
        positions.unshift(endThird);
        positions.unshift(startThird);
      }
      positions.unshift(endSecond);
      positions.unshift(startSecond);
    }
    positions.unshift(endFirst);
    positions.unshift(startFirst);
  }

  foundTiles.forEach((tile, i) => {
    tile.renderToFile(`tile-${i}`);
  });
};

module.exports = allTiles;
