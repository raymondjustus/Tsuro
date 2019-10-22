const { BoardState } = require('.');
const { BOARD_SIZE, DIRECTIONS, DIRECTIONS_CLOCKWISE } = require('./utils/constants');

class Board {
  /**
   * Creates a new board. Provides overrides for tiles and avatars for
   * cloning Board objects.
   *
   * @param {InitialPlacement[]} [initialPlacements=[]] an array of initial
   * placements that outline tile and avatar coords/positions
   * @param {BoardState} [stateOverride] override for initial state
   */
  constructor(initialPlacements = [], stateOverride) {
    this._state = new BoardState(stateOverride);

    initialPlacements.forEach(({ tile, coords, player, color, position }) => {
      if (this._hasNeighboringTiles(coords)) {
        throw 'Tile neighbors existing tile';
      } else if (!this._isTileOnBorder(coords)) {
        throw 'Tile must be placed on Border';
      } else if (!this._isAvatarOnValidInitialPosition(coords, position)) {
        throw 'Avatar must be placed on an inward-facing port';
      }
      this.placeTile(tile, coords, true);
      this._state.addAvatar(player, color, coords, position);
    });
  }

  /**
   * Creates a new copy of this Board.
   *
   * @returns {Board} a copy of this Board
   */
  copy() {
    const copiedState = this.getState();
    return new Board([], copiedState);
  }

  /**
   * Gets the current state of the board, via a copy.
   *
   * @returns {Board} the current state of the board
   */
  getState() {
    return this._state.copy();
  }

  /**
   * Places a tile on the board at the given coordinates. Then, updates
   * the board state with the new tile.
   *
   * @param {Tile} tile the tile to place
   * @param {Coords} coords the coordinates to place the tile at
   * @param {boolean} [skipUpdate=false] whether to skip updating
   * the avatars on the board after place
   */
  placeTile(tile, coords, skipUpdate = false) {
    this._state.addTile(tile, coords);

    if (!skipUpdate) {
      this._updateAvatars();
    }
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
      return this._state.getTile(neighborCoords);
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
    const tile = this._state.getTile(avatar.coords);
    const endPosition = tile.getEndingPosition(avatar.position);

    const neighborCoords = avatar.coords.copy().moveOne(endPosition.direction);
    const neighborTile = this._state.getTile(neighborCoords);

    if (neighborTile) {
      avatar.move(neighborCoords, endPosition.reflect());
      this._updateAvatar(avatar);
    }
  }

  /**
   * Updates the coordinates and positions of all avatars.
   */
  _updateAvatars() {
    this._state.getAvatars().forEach(avatar => {
      this._updateAvatar(avatar);
    });
  }
}

module.exports = Board;
