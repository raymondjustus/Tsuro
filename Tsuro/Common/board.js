const { Avatar, Coords } = require('./index');

const BOARD_SIZE = 10;

class Board {
  constructor(initialPlacements = []) {
    this.tiles = new Array(BOARD_SIZE).fill(new Array(BOARD_SIZE).fill(null));
    this.avatars = {};
    initialPlacements.forEach(({ tile, coords, player, color, position }) => {
      if (this._hasNeighboringTiles(coords)) {
        throw 'Tile neighbors existing tile';
      } else if (!this._isTileOnBorder(coords)) {
        throw 'Tile must be placed on Border';
      } else if (!this._isTokenOnCorrectEdge(coords, position)) {
        throw 'Token must be placed on forward-facing port';
      }
      this.placeTile(tile, coords);
      this._addAvatar(player, color, coords, position);
    });
  }

  placeTile(tile, coords) {
    const { x, y } = coords;
    const currentTile = this.tiles[x][y];
    if (currentTile) {
      throw 'Tile already exists at coords!';
    }
    this.tiles[x][y] = tile;
  }

  _addAvatar(player, color, coords, position) {
    const { id } = player;
    this.avatars[id] = new Avatar(id, color, coords, position);
  }

  getState() {
    return null;
    //return new Jersey();
  }

  _getNeighboringTiles(coords) {
    const { x, y } = coords;

    return [
      this._getTile(new Coords(x, y - 1)),
      this._getTile(new Coords(x + 1, y)),
      this._getTile(new Coords(x, y + 1)),
      this._getTile(new Coords(x - 1, y)),
    ];
  }

  _getTile(coords) {
    const { x, y } = coords;
    if (this.tiles[x] && this.tiles[x][y]) {
      return this.tiles[x][y];
    }
    return null;
  }

  _hasNeighboringTiles(coords) {
    return this._getNeighboringTiles(coords).some(tile => tile);
  }

  _isTileOnBorder(coords) {
    const { x, y } = coords;
    return x === 0 || x === BOARD_SIZE - 1 || y === 0 || y === BOARD_SIZE - 1;
  }

  _isTokenOnCorrectEdge(coords, position) {
    const { x, y } = coords;
    //left side of board
    if (x === 0) {
      if (y === 0) {
        //top left corener
        return position.direction === 'WEST' || position.direction === 'NORTH';
      }
      if (y === BOARD_SIZE - 1) {
        //bottom left corner
        return position.direction === 'WEST' || position.direction === 'SOUTH';
      }
      return position.direction === 'WEST';
      // right side of board
    } else if (x === BOARD_SIZE - 1) {
      if (y === 0) {
        //top right corener
        return position.direction === 'EAST' || position.direction === 'NORTH';
      }
      if (y === BOARD_SIZE - 1) {
        //bottom right corner
        return position.direction === 'EAST' || position.direction === 'SOUTH';
      }
      return position.direction === 'EAST';
    } else {
      // idk if this is right. double check here <<<<<<<<<<<<<<<<
      return false;
    }
  }
}

module.exports = Board;
