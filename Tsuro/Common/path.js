class Path {
  /**
   * Constructs a new Path object.
   *
   * @param {Position} start the start position of the pat
   * @param {Position} end the end position of the pat
   */
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  /**
   * Returns a new copy of this path.
   *
   * @returns {Path} a copy of this path
   */
  copy() {
    return new Path(this.start.copy(), this.end.copy());
  }

  /**
   * Gets the ending position of the path, given the starting position.
   *
   * @param {Position} position the starting position to check
   * @returns {Position} the other position, given a valid starting position
   * @returns {null} null if the position does not exist on the path
   */
  getEndingPosition(position) {
    if (this.start.isEqualTo(position)) {
      return this.end.copy();
    } else if (this.end.isEqualTo(position)) {
      return this.start.copy();
    }
    return null;
  }

  /**
   * Returns whether this path contains the given position.
   *
   * @param {Position} position the position to check for
   * @returns {boolean} whether the position is within the path
   */
  has(position) {
    return this.start.isEqualTo(position) || this.end.isEqualTo(position);
  }

  /**
   * Checks for a match on positions between this path and the given one.
   *
   * @param {Path} path the path to check equality against
   * @returns {boolean} whether the given path is equal to this one
   */
  isEqualTo(path) {
    return (
      (this.start.isEqualTo(path.start) && this.end.isEqualTo(path.end)) ||
      (this.start.isEqualTo(path.end) && this.end.isEqualTo(path.start))
    );
  }

  /**
   * Rotates the path 90 degrees clockwise per number of rotations given.
   *
   * @param {number} rotations the amount of 90-degree clockwise rotations
   * to perform
   */
  rotate(rotations) {
    this.start.rotate(rotations);
    this.end.rotate(rotations);
  }
}

module.exports = Path;
