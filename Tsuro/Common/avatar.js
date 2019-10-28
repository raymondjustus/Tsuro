const { Coords, Position } = require('.');
const { DIRECTIONS, PORTS } = require('./utils/constants');

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

    this._collided = false;
    this._exited = false;
    this._updateHash();
  }

  collide() {
    this._collided = true;
    return this;
  }

  /**
   * Creates a new copy of this Avatar.
   *
   * @returns {Avatar} a copy of this Avatar
   */
  copy() {
    const avatar = new Avatar(this.id, this.color, this.coords.copy(), this.position.copy());
    if (this.hasExited()) {
      avatar.exit();
    }
    if (this.hasCollided()) {
      avatar.collide();
    }
    return avatar;
  }

  exit() {
    this._exited = true;
    return this;
  }

  static generateHash(coords, position) {
    return `${coords.getHash()}${position.getHash()}`;
  }

  getHash() {
    return this._hash;
  }

  hasLost() {
    return this._collided || this._exited;
  }

  hasCollided() {
    return this._collided;
  }

  hasExited() {
    return this._exited;
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
    this._updateHash();
  }

  _updateHash() {
    this._hash = `${this.coords.getHash()}${this.position.getHash()}`;
  }
}

module.exports = Avatar;
