const Position = require('../position');
const { DIRECTIONS_CLOCKWISE, PORTS } = require('./constants');

const LETTERS = 'ABCDEFGH'.split('');
const LETTERS_MAP = LETTERS.reduce(
  (acc, key, i) =>
    Object.assign(acc, {
      [key]: i,
    }),
  {},
);

const POSITIONS_MAP = {};
const POSITIONS = DIRECTIONS_CLOCKWISE.flatMap((direction, i) => {
  const idx = i * 2;
  POSITIONS_MAP[direction] = {
    [PORTS.ZERO]: idx,
    [PORTS.ONE]: idx + 1,
  };

  return [new Position(direction, PORTS.ZERO), new Position(direction, PORTS.ONE)];
});

/**
 * Gets a Position object based on a given letter that
 * specifies a port on a tile.
 *
 * @param {string} letter a letter A-H, specifying a port
 * from North-0 to West-1, clockwise
 * @returns {Position} the respective position
 */
const getPositionFromLetter = letter => {
  const positionIdx = LETTERS_MAP[letter];
  if (positionIdx === undefined) {
    throw 'Letter is not valid.';
  }
  const position = POSITIONS[positionIdx];
  return position.copy();
};

/**
 * Gets a letter based on a given Position object.
 *
 * @param {Position} position the position object that
 * specifies a specific port on a tile
 * @returns {string} a letter A-H, specifying a port
 * from North-0 to West-1, clockwise
 */
const getLetterFromPosition = position => {
  if (!position || !(position instanceof Position)) {
    throw 'Position is not valid';
  }
  const { direction, port } = position;
  const portMap = POSITIONS_MAP[direction];
  if (!portMap) {
    throw 'Direction is not valid';
  }
  const letterIdx = portMap[port];
  if (letterIdx === undefined) {
    throw 'Port is not valid';
  }
  return LETTERS[letterIdx];
};

exports.getLetterFromPosition = getLetterFromPosition;
exports.getPositionFromLetter = getPositionFromLetter;
