// Represents a position on a single tile
// [DIRECTIONS.NORTH, 0]
class Position {
  constructor(direction, port) {
    this.direction = direction; // int
    this.port = port; // int
  }
}

module.exports = Position;
