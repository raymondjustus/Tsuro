const {
  Coords,
  InitialAction,
  IntermediateAction,
  Position,
  RuleChecker,
} = require('../../Common');
const { DIRECTIONS, DIRECTIONS_CLOCKWISE, PORTS } = require('../../Common/utils/constants');
const Strategy = require('./Strategy');

const DIRECTIONS_CHECK = [DIRECTIONS.EAST, DIRECTIONS.SOUTH, DIRECTIONS.WEST, DIRECTIONS.NORTH];
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
   * @returns {InitialAction}
   */
  static getInitialAction(id, hand, boardState) {
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

    const position = POSITIONS_CHECK.find(position =>
      RuleChecker.canPlaceAvatar(boardState, id, coords, tile, position)
    );
    if (!position) {
      throw 'No valid positions on this tile';
    }
    return new InitialAction(tile, coords, position);
  }

  /**
   *
   * @param {string} id
   * @param {Tile[]} hand
   * @param {BoardState} boardState
   * @returns {IntermediateAction}
   */
  static getIntermediateAction(id, hand, boardState) {
    const tile = hand[0];
    const avatar = boardState.getAvatar(id);
    const coords = avatar.coords.copy().moveOne(avatar.position.direction);
    return new IntermediateAction(tile, coords);
  }
}

module.exports = DumbStrategy;
