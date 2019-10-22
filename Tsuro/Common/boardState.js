const { Avatar } = require('.');
const { BOARD_SIZE } = require('./constants');

class BoardState {
  /**
   * Creates a new Board State.
   *
   * @param {BoardState} [initialState] an override for initial state
   */
  constructor(initialState) {
    if (initialState) {
      this._avatars = initialState._avatars;
      this._tiles = initialState._tiles;
    } else {
      this._avatars = {};

      this._tiles = [];
      for (let x = 0; x < BOARD_SIZE; x++) {
        this._tiles[x] = [];
        for (let y = 0; y < BOARD_SIZE; y++) {
          this._tiles[x][y] = null;
        }
      }
    }
  }

  /**
   * Adds an avatar to the board.
   *
   * @param {Player} player the player to attach to the avatar
   * @param {string} color the chosen avatar color
   * @param {Coords} coords the starting coordinates of the avatar
   * @param {Position} position the starting position of the avatar
   */
  addAvatar(player, color, coords, position) {
    const { id } = player;
    if (this._avatars[id]) {
      throw 'Player already has avatar on board';
    }
    this._avatars[id] = new Avatar(id, color, coords, position);
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
    const avatars = Object.keys(this._avatars).map(key => this._avatars[key].copy());
    const tiles = this._tiles.map(row => row.map(tile => (tile ? tile.copy() : null)));
    return new BoardState(tiles, avatars);
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
    return Object.entries(this._avatars);
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
}

module.exports = BoardState;
