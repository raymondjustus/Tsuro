const { DIRECTIONS, DIRECTIONS_CLOCKWISE, PORTS } = require('./utils/constants');

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
    this._updateHash();
  }

  /**
   * Returns a new copy of this position.
   *
   * @returns {Position} a copy of this position
   */
  copy() {
    return new Position(this.direction, this.port);
  }

  getHash() {
    return this._hash;
  }

  /**
   * Reflects the current position to represent the connecting
   * side on a neighboring tile.
   *
   * @returns {Position} this position, reflected
   */
  reflect() {
    if (this.direction === DIRECTIONS.NORTH) {
      this.direction = DIRECTIONS.SOUTH;
    } else if (this.direction === DIRECTIONS.EAST) {
      this.direction = DIRECTIONS.WEST;
    } else if (this.direction === DIRECTIONS.SOUTH) {
      this.direction = DIRECTIONS.NORTH;
    } else if (this.direction === DIRECTIONS.WEST) {
      this.direction = DIRECTIONS.EAST;
    }
    this.port = this.port === PORTS.ZERO ? PORTS.ONE : PORTS.ZERO;
    this._updateHash();
    return this;
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
   * @returns {Position} this position, rotated
   */
  rotate(rotations) {
    const idx = DIRECTIONS_CLOCKWISE.indexOf(this.direction);
    const newIdx = (idx + rotations) % DIRECTIONS_CLOCKWISE.length;
    this.direction = DIRECTIONS_CLOCKWISE[newIdx];
    this._updateHash();
    return this;
  }

  _updateHash() {
    this._hash = `${this.direction}${this.port}`;
  }
}

module.exports = Position;
