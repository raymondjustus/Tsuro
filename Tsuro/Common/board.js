const { BoardState } = require('.');
const { BOARD_SIZE, DIRECTIONS } = require('./utils/constants');

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
      } else if (!this.isAvatarOnOutsidePosition(coords, position)) {
        throw 'Avatar must be placed on an inward-facing port';
      }
      this.placeTile(tile, coords, true);
      this.placeAvatar(player, color, coords, position);
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
   * Gets a copy of an avatar with the given ID.
   *
   * @returns {Avatar} the copy of the avatar with the given ID
   * @returns {null} `null`, if the avatar doesn't exist
   */
  getAvatar(id) {
    const avatar = this._state.getAvatar(id);
    if (avatar) {
      return avatar.copy();
    }
    return avatar;
  }

  /**
   * Gets the current state of the board, via a copy.
   *
   * @returns {BoardState} the current state of the board
   */
  getState() {
    return this._state.copy();
  }

  /**
   * Places an avatar on the board. Then, updates the board state with the
   * new avatar.
   *
   * @param {Player} player the player to attach to the avatar
   * @param {string} color the chosen avatar color
   * @param {Coords} coords the starting coordinates of the avatar
   * @param {Position} position the starting position of the avatar
   */
  placeAvatar(player, color, coords, position) {
    this._state.addAvatar(player, color, coords, position);
    this._updateAvatars();
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
   * Checks whether a tile with the given coordinates has any
   * neighboring tiles.
   *
   * @param {Coords} coords the coordinates to check
   * @returns {boolean} whether the tile has any neighbors
   */
  _hasNeighboringTiles(coords) {
    return this._state.hasNeighboringTiles(coords);
  }

  /**
   * @private
   * Whether an avatar is to be placed on a valid initial position
   * on a tile at the given coordinates.
   *
   * @param {Coords} coords the coordinates of the avatar's tile
   * @param {Position} position the position of the avatar
   * @returns {boolean} whether the initial position is valid
   */
  static isAvatarOnOutsidePosition(coords, position) {
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
   * @private
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
   * @private
   * Updates the coordinates and position of the given avatar, given that
   * the avatar has not yet exited the board. Moves the avatar along the board
   * based on board paths. Marks the avatar as exited if it cannot move further.
   *
   * @param {Avatar} avatar the avatar to update
   */
  _updateAvatar(avatar) {
    if (!avatar.hasExited()) {
      const position = avatar.position.copy();

      let neighborCoords = null;
      try {
        neighborCoords = avatar.coords.copy().moveOne(position.direction);
      } catch (err) {
        return avatar.exit();
      }
      const neighborTile = this._state.getTile(neighborCoords);

      if (neighborTile) {
        const intermediatePosition = position.reflect();
        const finalPosition = neighborTile.getEndingPosition(intermediatePosition);
        this._state.moveAvatar(avatar.id, neighborCoords, finalPosition);
        this._updateAvatar(avatar);
      }
    }
  }

  /**
   * @private
   * Updates the coordinates and positions of all avatars.
   */
  _updateAvatars() {
    this._state.getAvatars().forEach(avatar => {
      this._updateAvatar(avatar);
    });
  }
}

module.exports = Board;
