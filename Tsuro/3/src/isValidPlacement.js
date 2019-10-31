const { LETTERS_MAP } = require('../../Common/utils/constants');
const { COLOR_SET } = require('./constants');

/**
 * Helper function for checking if the given placement arguments are valid.
 *
 * @param {any} color the user argument for color
 * @param {any} tileIndex the user argument for tile index
 * @param {any} rotation the user argument for rotation
 * @param {any} x the user argument for x
 * @param {any} y the user argument for y
 * @returns {boolean} whether the given arguments are valid
 */
const areValidPlacementArgs = (color, tileIndex, rotation, x, y) => {
  /**
   * Helper function for checking if the given value is a valid
   * number between the min and max values, inclusive.
   *
   * @param {any} val the value to check
   * @param {number} min the minimum value, inclusive
   * @param {number} max the maximum value, inclusive
   * @returns {boolean} whether the given value is valid
   */
  const isValidNumber = (val, min, max) => typeof val === 'number' && val >= min && val <= max;

  return (
    typeof color === 'string' &&
    COLOR_SET.has(color) &&
    isValidNumber(tileIndex, 0, 34) &&
    (typeof rotation === 'number' &&
      (rotation === 0 || rotation === 90 || rotation === 180 || rotation === 270)) &&
    isValidNumber(x, 0, 9) &&
    isValidNumber(y, 0, 9)
  );
};

/**
 * Whether the given placement is a valid intermediate placement
 * instruction.
 *
 * @param {any} placement the user placement to check
 * @returns {boolean} whether the placement instruction is valid
 */
const isValidIntermediatePlacement = placement => {
  if (!Array.isArray(placement) || placement.length !== 5) {
    return false;
  }
  const [color, tileIndex, rotation, x, y] = placement;
  return areValidPlacementArgs(color, tileIndex, rotation, x, y);
};

/**
 * Whether the given placement is a valid initial placement
 * instruction.
 *
 * @param {any} placement the user placement to check
 * @returns {boolean} whether the placement instruction is valid
 */
const isValidInitialPlacement = placement => {
  if (!Array.isArray(placement) || placement.length !== 6) {
    return false;
  }
  const [tileIndex, rotation, color, port, x, y] = placement;
  return (
    areValidPlacementArgs(color, tileIndex, rotation, x, y) &&
    (typeof port === 'string' && LETTERS_MAP[port] !== undefined)
  );
};

/**
 * Whether the given placement is a valid placement instruction.
 *
 * @param {any} placement the user placement to check
 * @param {boolean} [isInitial=false] whether to check for a valid
 * initial placement
 * @returns {boolean} whether the placement instruction is valid
 */
const isValidPlacement = (placement, isInitial = false) => {
  if (isInitial) {
    return isValidInitialPlacement(placement);
  }
  return isValidIntermediatePlacement(placement);
};

module.exports = isValidPlacement;
