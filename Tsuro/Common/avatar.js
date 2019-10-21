const { Coords, Position } = require('./index');
const { DIRECTIONS, PORTS } = require('./constants');
const DEFAULT_POSITION = new Position(DIRECTIONS.NORTH, PORTS.ZERO);
const DEFAULT_COORDS = new Coords(0, 0);

class Avatar {
  constructor(id, color, coords = DEFAULT_COORDS, position = DEFAULT_POSITION) {
    this.id = id;
    this.color = color;
    this.coords = coords;
    this.position = position;
  }
}

module.exports = Avatar;
