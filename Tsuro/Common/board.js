const { Avatar } = require('.');
const { BOARD_SIZE, DIRECTIONS, DIRECTIONS_CLOCKWISE } = require('./constants');

class Board {
  /**
   * Creates a new board. Provides overrides for tiles and avatars for
   * cloning Board objects.
   *
   * @param {InitialPlacement[]} [initialPlacements=[]] an array of initial
   * placements that outline tile and avatar coords/positions
   * @param {tile[]} [tilesOverride] override array for tiles
   * @param {{ [string]: avatar }} [avatarsOverride] override object for
   * avatars
   */
  constructor(initialPlacements = [], tilesOverride, avatarsOverride) {
    this.avatars = avatarsOverride || {};

    this.tiles = tilesOverride;
    if (!tilesOverride) {
      this.tiles = [];
      for (let x = 0; x < BOARD_SIZE; x++) {
        this.tiles[x] = [];
        for (let y = 0; y < BOARD_SIZE; y++) {
          this.tiles[x][y] = null;
        }
      }
    }

    initialPlacements.forEach(({ tile, coords, player, color, position }) => {
      if (this._hasNeighboringTiles(coords)) {
        throw 'Tile neighbors existing tile';
      } else if (!this._isTileOnBorder(coords)) {
        throw 'Tile must be placed on Border';
      } else if (!this._isAvatarOnValidInitialPosition(coords, position)) {
        throw 'Avatar must be placed on an inward-facing port';
      }
      this.placeTile(tile, coords, true);
      this._addAvatar(player, color, coords, position);
    });
  }

  /**
   * Creates a new copy of this Board.
   *
   * @returns {Board} a copy of this Board
   */
  copy() {
    const tiles = this.tiles.map(row => row.map(tile => (tile ? tile.copy() : null)));
    const avatars = Object.keys(this.avatars).reduce(
      (acc, id) =>
        Object.assign(acc, {
          [id]: this.avatars[id].copy(),
        }),
      {}
    );
    return new Board([], tiles, avatars);
  }

  /**
   * Gets the current state of the board, via a copy.
   *
   * @returns {Board} the current state of the board
   */
  getState() {
    return this.copy();
  }

  /**
   * Places a tile on the board at the given coordinates.
   *
   * @param {Tile} tile the tile to place
   * @param {Coords} coords the coordinates to place the tile at
   * @param {boolean} [skipUpdate=false] whether to skip updating
   * the avatars on the board after place
   */
  placeTile(tile, coords, skipUpdate = false) {
    const { x, y } = coords;
    const currentTile = this.tiles[x][y];
    if (currentTile) {
      throw 'Tile already exists at coords!';
    }
    this.tiles[x][y] = tile;

    if (!skipUpdate) {
      this._updateAvatars();
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
  _addAvatar(player, color, coords, position) {
    const { id } = player;
    if (this.avatars[id]) {
      throw 'Player already has avatar on board';
    }
    this.avatars[id] = new Avatar(id, color, coords, position);
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
      return this._getTile(neighborCoords);
    } catch (err) {
      return null;
    }
  }

  /**
   * Gets a tile at the given coordinates. Returns null if no
   * tile exists.
   *
   * @param {Coords} coords the coordinates to get the tile at
   * @returns {Tile} the tile at the given coordinates
   * @returns {null} `null`, if no tile exists at given coordinates
   */
  _getTile(coords) {
    const { x, y } = coords;
    if (this.tiles[x] && this.tiles[x][y]) {
      return this.tiles[x][y];
    }
    return null;
  }

  /**
   * Checks whether a tile with the given coordinates has any
   * neighboring tiles.
   *
   * @param {Coords} coords the coordinates to check
   * @returns {boolean} whether the tile has any neighbors
   */
  _hasNeighboringTiles(coords) {
    return DIRECTIONS_CLOCKWISE.some(direction => !!this._getNeighboringTile(coords, direction));
  }

  /**
   * Whether an avatar is to be placed on a valid initial position
   * on a tile at the given coordinates.
   *
   * @param {Coords} coords the coordinates of the avatar's tile
   * @param {Position} position the position of the avatar
   * @returns {boolean} whether the initial position is valid
   */
  _isAvatarOnValidInitialPosition(coords, position) {
    const { x, y } = coords;
    const { direction } = position;

    let isValid = false;

    if (x === 0) {
      isValid = direction === DIRECTIONS.WEST;
    } else if (x === BOARD_SIZE - 1) {
      isValid = direction === DIRECTIONS.EAST;
    }

    if (y === 0) {
      isValid = isValid || direction === DIRECTIONS.NORTH;
    } else if (y === BOARD_SIZE - 1) {
      isValid = isValid || direction === DIRECTIONS.SOUTH;
    }

    return isValid;
  }

  /**
   * Checks whether the given coordinates of a tile are along
   * the board's border.
   *
   * @param {Coords} coords the coordinates to check
   * @returns {boolean} whether the coordinates are on the border
   */
  _isTileOnBorder(coords) {
    const { x, y } = coords;
    return x === 0 || x === BOARD_SIZE - 1 || y === 0 || y === BOARD_SIZE - 1;
  }

  /**
   * Updates the coordinates and position of the given avatar.
   * Moves the avatar along the board based on board paths.
   *
   * @param {Avatar} avatar the avatar to update
   */
  _updateAvatar(avatar) {
    const tile = this._getTile(avatar.coords);
    const endPosition = tile.getEndingPosition(avatar.position);

    const neighborCoords = avatar.coords.copy().moveOne(endPosition.direction);
    const neighborTile = this._getTile(neighborCoords);

    if (neighborTile) {
      avatar.move(neighborCoords, endPosition.reflect());
      this._updateAvatar(avatar);
    }
  }

  /**
   * Updates the coordinates and positions of all avatars.
   */
  _updateAvatars() {
    Object.keys(this.avatars).forEach(id => {
      const avatar = this.avatars[id];
      this._updateAvatar(avatar);
    });
  }
}

module.exports = Board;
