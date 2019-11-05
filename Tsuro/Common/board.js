const fs = require('fs');
const D3Node = require('d3-node');
const BoardState = require('./boardState');
const Tile = require('./tiles');
const { BOARD_SIZE, DIRECTIONS, RENDER_STYLES } = require('./utils/constants');

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
    this.d3Node = new D3Node({ styles: RENDER_STYLES });
    this.d3 = this.d3Node.d3;

    this._state = new BoardState(stateOverride);

    initialPlacements.forEach(({ tile, coords, player, color, position }) => {
      player.setColor(color);
      this.placeInitialTileAvatar(player, tile, coords, position);
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
   * Gets a copy of all avatars on the board.
   *
   * @returns {Avatar[]} the copy of all avatars on the board
   */
  getAvatars() {
    return this._state.getAvatars().map(avatar => avatar.copy());
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
   * @private
   * Places an avatar on the board. Then, updates the board state with the
   * new avatar.
   *
   * @param {Player} player the player to attach to the avatar
   * @param {Coords} coords the starting coordinates of the avatar
   * @param {Position} position the starting position of the avatar
   */
  _placeAvatar(player, coords, position) {
    this._state.addAvatar(player, coords, position);
    this._updateAvatars();
  }

  /**
   * @private
   * Places a tile on the board at the given coordinates. Then, updates
   * the board state with the new tile (if not skipped).
   *
   * @param {Tile} tile the tile to place
   * @param {Coords} coords the coordinates to place the tile at
   * @param {boolean} [skipUpdate=false] whether to skip updating
   * the avatars on the board after place
   */
  _placeTileAndUpdate(tile, coords, skipUpdate = false) {
    this._state.addTile(tile, coords);

    if (!skipUpdate) {
      this._updateAvatars();
    }
  }

  /**
   * Places an initial tile and avatar on the board.
   *
   * @param {Player} player the player to attach to the avatar
   * @param {Tile} tile the tile to place
   * @param {Coords} coords the coordinates to place the tile at
   * @param {Position} position the starting position of the avatar
   * on the tile
   */
  placeInitialTileAvatar(player, tile, coords, position) {
    if (this._hasNeighboringTiles(coords)) {
      throw 'Tile neighbors existing tile';
    } else if (!this._isTileOnBorder(coords)) {
      throw 'Tile must be placed on Border';
    } else if (!Board.isAvatarOnOutsidePosition(coords, position)) {
      throw 'Avatar must be placed on an inward-facing port';
    }
    this._placeTileAndUpdate(tile, coords, true);
    this._placeAvatar(player, coords, position);
  }

  /**
   * Places a tile on the board at the given coordinates. Then, updates
   * the board state with the new tile.
   *
   * @param {Tile} tile the tile to place
   * @param {Coords} coords the coordinates to place the tile at
   */
  placeTile(tile, coords) {
    this._placeTileAndUpdate(tile, coords);
  }

  /**
   * Removes an avatar from the board state.
   *
   * @param {string} id the avatar's associated player ID
   */
  removeAvatar(id) {
    this._state.removeAvatar(id);
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

  ///////////////////////////////////
  // RENDER FUNCTIONS
  ///////////////////////////////////

  /**
   * Renders a board to the given selection.
   *
   * @param {d3.Selection} selection the current D3 selection
   * @param {number} xStart the starting x position for the board
   * @param {number} yStart the starting y position for the board
   * @param {number} size the total size of the board
   */
  render(selection, xStart, yStart, size) {
    const tileSize = size / BOARD_SIZE;

    const emptyTile = new Tile();
    this._state.getTiles().forEach((column, x) => {
      column.forEach((tile, y) => {
        const tileToRender = tile || emptyTile;
        const tileX = xStart + x * tileSize;
        const tileY = yStart + y * tileSize;
        tileToRender.render(selection, tileX, tileY, tileSize);
      });
    });
  }

  /**
   * Renders a tile to the render directory, given a filename.
   *
   * @param {string} path the path of the file (with extension)
   * @param {string} size the size of the image
   */
  renderToFile(path, size = 800) {
    const svg = this.d3Node.createSVG(size, size);

    this.render(svg, 0, 0, size);

    const svgFile = fs.createWriteStream(path);
    svgFile.write(this.d3Node.svgString());
    svgFile.end();
  }
}

module.exports = Board;
