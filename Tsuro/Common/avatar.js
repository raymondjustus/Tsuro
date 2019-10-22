const { Coords, Position } = require('.');
const { DIRECTIONS, PORTS } = require('./constants');

class Avatar {
  /**
   * Creates a new Avatar for a player.
   *
   * @param {string} id a unique ID, matching a respective player
   * @param {string} color the avatar color
   * @param {Coords} [coords] the initial coordinates of the avatar
   * @param {Position} [position] the initial position on a tile
   */
  constructor(id, color, coords, position) {
    this.id = id;
    this.color = color;
    this.coords = coords || new Coords(0, 0);
    this.position = position || new Position(DIRECTIONS.NORTH, PORTS.ZERO);
  }

  /**
   * Creates a new copy of this Avatar.
   *
   * @returns {Avatar} a copy of this Avatar
   */
  copy() {
    return new Avatar(this.id, this.color, this.coords.copy(), this.position.copy());
  }

  /**
   * Moves this Avatar to the given coords and position.
   *
   * @param {Coords} coords the new Avatar coords
   * @param {Position} position the new Avatar position
   */
  move(coords, position) {
    this.coords = coords;
    this.position = position;
  }
}

module.exports = Avatar;
