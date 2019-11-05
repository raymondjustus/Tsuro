const { Coords, Position, RuleChecker, TilePlacement } = require('../../Common');
const { DIRECTIONS_CLOCKWISE, PORTS } = require('../../Common/utils/constants');
const Strategy = require('./Strategy');

const DIRECTIONS_CHECK = DIRECTIONS_CLOCKWISE.slice(1).concat(DIRECTIONS_CLOCKWISE.slice(0, 1));
const POSITIONS_CHECK = DIRECTIONS_CLOCKWISE.reduce(
  (acc, direction) => [
    ...acc,
    new Position(direction, PORTS.ZERO),
    new Position(direction, PORTS.ONE),
  ],
  []
);

class DumbStrategy extends Strategy {
  /**
   *
   * @param {string} id
   * @param {Tile[]} hand
   * @param {BoardState} boardState
   */
  static getInitialPlacement(id, hand, boardState) {
    const tile = hand[2];
    const coords = new Coords(0, 0);

    let directionIdx = 0;
    while (boardState.getTile(coords) && directionIdx < DIRECTIONS_CHECK.length) {
      try {
        coords.moveOne(DIRECTIONS_CHECK[directionIdx]);
      } catch (err) {
        directionIdx += 1;
      }
    }
    if (directionIdx === DIRECTIONS_CHECK.length) {
      throw 'Too many players on the board';
    }

    for (let i = 0; i < POSITIONS_CHECK.length; i++) {
      const position = POSITIONS_CHECK[i];
      if (RuleChecker.canPlaceAvatar(boardState, id, coords, tile, position)) {
        // TODO: Reshape InitialPlacement to match this
        return { tile, coords, position };
      }
    }
    throw 'No valid positions on the tile';
  }

  /**
   *
   * @param {string} id
   * @param {Tile[]} hand
   * @param {BoardState} boardState
   */
  static getTilePlacement(id, hand, boardState) {
    const tile = hand[0];
    const avatar = boardState.getAvatar(id);
    const coords = avatar.coords.copy().moveOne(avatar.position.direction);
    return new TilePlacement(tile, coords);
  }
}

module.exports = DumbStrategy;
