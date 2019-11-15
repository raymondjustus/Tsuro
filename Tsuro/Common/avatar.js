const { Coords, Position } = require('.');
const RenderUtils = require('./renderUtils');
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

  /**
   * Marks this Avatar as having collided with another
   * avatar.
   *
   * @returns {Avatar} this avatar, collided
   */
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

  /**
   * Marks this Avatar as having exited the board.
   *
   * @returns {Avatar} this avatar, exited
   */
  exit() {
    this._exited = true;
    return this;
  }

  /**
   * @static
   * Static method for generating an Avatar hash, using the
   * given coordinates and position.
   *
   * @param {Coords} coords the coordinates of an Avatar
   * @param {Position} position the position of an Avatar
   * @returns {string} the theoretical Avatar hash
   */
  static generateHash(coords, position) {
    return `${coords.getHash()}${position.getHash()}`;
  }

  /**
   * Gets this Avatar's hash.
   *
   * @returns {string} this Avatar's hash
   */
  getHash() {
    return this._hash;
  }

  /**
   * Checks whether this Avatar has lost, either by colliding
   * or exiting the board.
   *
   * @returns {boolean} whether this Avatar has lost
   */
  hasLost() {
    return this._collided || this._exited;
  }

  /**
   * Checks whether this Avatar has collided with another Avatar.
   *
   * @returns {boolean} whether this Avatar collided
   */
  hasCollided() {
    return this._collided;
  }

  /**
   * Checks whether this Avatar has exited the board.
   *
   * @returns {boolean} whether this Avatar exited the board
   */
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

  /**
   * @private
   * Updates this Avatar's hash to match new coordinates and/ors
   * position.
   */
  _updateHash() {
    this._hash = `${this.coords.getHash()}${this.position.getHash()}`;
  }

  /**
   * Renders an avatar to the given selection.
   *
   * @param {d3.Selection} selection the current D3 selection
   * @param {number} xStart the starting x position for the board
   * @param {number} yStart the starting y position for the board
   * @param {number} tileSize the size of a board tile
   */
  render(selection, xStart, yStart, tileSize) {
    const { x, y } = this.coords;
    const boardX = xStart + x * tileSize;
    const boardY = yStart + y * tileSize;

    const renderUtils = new RenderUtils(boardX, boardY, tileSize);
    const [cx, cy] = renderUtils.getPositionCoords(this.position);

    const group = selection.append('g').classed('dead', this.hasLost());

    /**
     * Renders a circle with the given class name to the avatar
     * selection group.
     *
     * @param {string} className the circle's class name
     * @returns {d3.Selection} the rendered circle
     */
    const renderCircle = className =>
      group
        .append('circle')
        .attr('class', className)
        .attr('cx', renderUtils.scaleX(cx))
        .attr('cy', renderUtils.scaleY(cy))
        .attr('r', Math.min(tileSize * 0.07, 10));

    renderCircle('avatar__shadow');
    renderCircle('avatar').attr('fill', this.color);
  }
}

module.exports = Avatar;
