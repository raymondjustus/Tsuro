const { Avatar } = require('.');
const { getEmptyBoardArray } = require('./utils');
const { DIRECTIONS_CLOCKWISE } = require('./utils/constants');

require('./utils/polyfills');

class BoardState {
  /**
   * Creates a new Board State.
   *
   * @param {BoardState} [initialState] an override for initial state
   */
  constructor(initialState) {
    if (initialState) {
      this._avatars = initialState._avatars;
      this._initialAvatarHashes = initialState._initialAvatarHashes;
      this._tiles = initialState._tiles;
    } else {
      this._avatars = {};
      this._initialAvatarHashes = {};
      this._tiles = getEmptyBoardArray();
    }
  }

  /**
   * Adds an avatar to the board.
   *
   * @param {Player} player the player to attach to the avatar
   * @param {Coords} coords the starting coordinates of the avatar
   * @param {Position} position the starting position of the avatar
   * @returns {Avatar} the newly created avatar
   */
  addAvatar(player, coords, position) {
    const { id } = player;
    if (this._avatars[id]) {
      throw 'Player already has avatar on board';
    }
    const tile = this.getTile(coords);
    const avatar = new Avatar(id, player.getColor(), coords, position);
    this._initialAvatarHashes[avatar.getHash(coords, position)] = id;
    this._avatars[id] = avatar;

    const endPosition = tile.getEndingPosition(position);
    this.moveAvatar(id, coords, endPosition);
    return avatar;
  }

  /**
   * Places a tile on the board at the given coordinates.
   *
   * @param {Tile} tile the tile to place
   * @param {Coords} coords the coordinates to place the tile at
   */
  addTile(tile, coords) {
    const { x, y } = coords;
    const currentTile = this._tiles[x][y];
    if (currentTile) {
      throw 'Tile already exists at coords';
    }
    this._tiles[x][y] = tile;
  }

  /**
   * Creates a new copy of this Board State.
   *
   * @returns {BoardState} a copy of this Board State
   */
  copy() {
    const newState = new BoardState();
    newState._avatars = Object.keys(this._avatars).reduce(
      (acc, id) => Object.assign(acc, { [id]: this._avatars[id].copy() }),
      {}
    );
    newState._initialAvatarHashes = Object.keys(this._initialAvatarHashes).reduce(
      (acc, key) =>
        Object.assign(acc, {
          [key]: this._initialAvatarHashes[key],
        }),
      {}
    );
    newState._tiles = this._tiles.map(row => row.map(tile => (tile ? tile.copy() : null)));
    return newState;
  }

  /**
   * Gets a single avatar with the given ID. Returns null
   * if an avatar with the given ID doesn't exist.
   *
   * @param {string} id the ID of the desired avatar
   * @returns {Avatar} the avatar with the given ID
   * @returns {null} `null`, if the avatar doesn't exist
   */
  getAvatar(id) {
    return this._avatars[id] || null;
  }

  /**
   * Gets a list of the avatars in the board state.
   *
   * @returns {Avatar[]} a list of avatars
   */
  getAvatars() {
    return Object.values(this._avatars);
  }

  /**
   * Gets a tile at the given coordinates. Returns null if no
   * tile exists.
   *
   * @param {Coords} coords the coordinates to get the tile at
   * @returns {Tile} the tile at the given coordinates
   * @returns {null} `null`, if no tile exists at given coordinates
   */
  getTile(coords) {
    const { x, y } = coords;
    if (this._tiles[x] && this._tiles[x][y]) {
      return this._tiles[x][y];
    }
    return null;
  }

  /**
   * Gets a list of all tiles on the board, including empty (`null`)
   * spaces.
   *
   * @returns {Tile[][]} a list representation of the board tiles
   */
  getTiles() {
    return this._tiles;
  }

  /**
   * Gets a tile's neighboring tile in the given direction.
   *
   * @param {Coords} coords the coordinates of the tile
   * @param {string} direction the direction to get the neighbor at
   * @returns {Tile} the neighboring tile
   * @returns {null} `null`, if no tile exists in that direction
   */
  _getNeighboringTile(coords, direction) {
    try {
      const neighborCoords = coords.copy().moveOne(direction);
      return this.getTile(neighborCoords);
    } catch (err) {
      return null;
    }
  }

  /**
   * Checks whether a tile with the given coordinates has any
   * neighboring tiles.
   *
   * @param {Coords} coords the coordinates to check
   * @returns {boolean} whether the tile has any neighbors
   */
  hasNeighboringTiles(coords) {
    return DIRECTIONS_CLOCKWISE.some(direction => !!this._getNeighboringTile(coords, direction));
  }

  /**
   * Moves an avatar with the given ID to the given coordinates and
   * position. Marks an avatar as collided if it lands on another
   * avatar's initial starting place.
   *
   * @param {string} id the ID of the avatar
   * @param {Coords} coords the new coords of the avatar
   * @param {Position} position the new position of the avatar
   */
  moveAvatar(id, coords, position) {
    const avatar = this.getAvatar(id);
    if (!avatar) {
      throw 'Avatar does not exist.';
    }
    avatar.move(coords, position);
    if (this._initialAvatarHashes[avatar.getHash()]) {
      avatar.collide();
    }
  }

  /**
   * Removes the avatar of the given ID from the board.
   *
   * @param {string} id the avatar's associated player ID
   */
  removeAvatar(id) {
    delete this._avatars[id];
  }
}

module.exports = BoardState;
