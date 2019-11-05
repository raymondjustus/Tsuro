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

    let position = this._getPosition(id, tile, coords, boardState);

    let directionIdx = 0;
    while (!position && directionIdx < DIRECTIONS_CHECK.length) {
      try {
        coords.moveOne(DIRECTIONS_CHECK[directionIdx]);
        position = this._getPosition(id, tile, coords, boardState);
      } catch (err) {
        directionIdx += 1;
      }
    }
    if (directionIdx === DIRECTIONS_CHECK.length) {
      throw 'Too many players on the board';
    }
    return new InitialAction(tile, coords, position);
  }

  /**
   * Gets a valid position to place an avatar on, at the given coords and
   * tile. If no such position exists, it will return null.
   *
   * @param {string} id
   * @param {Tile} tile
   * @param {Coords} coords
   * @param {BoardState} boardState
   * @returns {Position|null}
   */
  static _getPosition(id, tile, coords, boardState) {
    let position;
    if (!boardState.getTile(coords)) {
      position = POSITIONS_CHECK.find(position =>
        RuleChecker.canPlaceAvatar(boardState, id, coords, tile, position)
      );
    }
    return position || null;
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
