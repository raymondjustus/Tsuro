const { DIRECTIONS_CLOCKWISE } = require('./constants');

class Position {
  /**
   * Constructs a new Position object.
   *
   * @param {string} direction the direction of the tile
   * @param {number} port the port of the given directional side
   */
  constructor(direction, port) {
    this.direction = direction;
    this.port = port;
  }

  /**
   * Returns a new copy of this position.
   *
   * @returns {Position} a copy of this position
   */
  copy() {
    return new Position(this.direction, this.port);
  }

  /**
   * Checks for an exact match on direction and port between this position
   * and the given one.
   *
   * @param {Position} position the position to check equality against
   * @returns {boolean} whether the given position is equal to this one
   */
  isEqualTo(position) {
    return this.direction === position.direction && this.port === position.port;
  }

  /**
   * Rotates the position 90 degrees clockwise per number of rotations given.
   *
   * @param {number} rotations the amount of 90-degree clockwise rotations
   * to perform
   */
  rotate(rotations) {
    const idx = DIRECTIONS_CLOCKWISE.indexOf(this.direction);
    const newIdx = (idx + rotations) % DIRECTIONS_CLOCKWISE.length;
    this.direction = DIRECTIONS_CLOCKWISE[newIdx];
  }
}

module.exports = Position;
