const { BOARD_SIZE, DIRECTIONS } = require('./utils/constants');

class Coords {
  /**
   * Creates a new Coords object.
   *
   * @param {number} x the x coordinate
   * @param {number} y the y coordinate
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Creates a new copy of this Coords.
   *
   * @returns {Coords} a copy of this Coords
   */
  copy() {
    return new Coords(this.x, this.y);
  }

  /**
   * Checks whether the given value is valid as a single
   * coordinate value.
   *
   * @param {number} value the value to check
   * @returns {boolean} whether the coordinate value is valid
   */
  _isValidCoordinate(value) {
    return value > 0 && value < BOARD_SIZE;
  }

  /**
   * Moves the coordinates along a single axis by the given value.
   *
   * @param {number} value the value to move by
   * @param {boolean} isHorizontalMove whether the move occurs along
   * the x-axis
   * @param {boolean} isPositive whether move is positive (increase)
   */
  _moveAlongAxis(value, isHorizontalMove, isPositive) {
    const key = isHorizontalMove ? 'x' : 'y';
    const multiplier = isPositive ? 1 : -1;
    const newVal = this[key] + multiplier * value;
    if (!this._isValidCoordinate(newVal)) {
      throw 'Cannot move this way';
    }
    this[key] = newVal;
  }

  /**
   * Moves this Coords in a given direction for a given value.
   *
   * @param {string} direction the direction to move
   * @param {number} value a positive value to move by
   * @returns {Coords} this Coords, moved
   */
  move(direction, value) {
    if (value < 0) {
      throw 'Value must be positive';
    } else if (value > 0) {
      if (direction === DIRECTIONS.NORTH || direction === DIRECTIONS.SOUTH) {
        this._moveAlongAxis(value, false, direction === DIRECTIONS.SOUTH);
      } else if (direction === DIRECTIONS.EAST || direction === DIRECTIONS.WEST) {
        this._moveAlongAxis(value, true, direction === DIRECTIONS.EAST);
      } else {
        throw 'Invalid direction';
      }
    }
    return this;
  }

  /**
   * Moves this Coords in a given direction by one.
   *
   * @param {string} direction the direction to move
   * @returns {Coords} this Coords, moved
   */
  moveOne(direction) {
    return this.move(direction, 1);
  }
}

module.exports = Coords;
