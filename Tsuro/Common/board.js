const { Avatar } = require('./index');

const BOARD_SIZE = 10;

class Board {
  constructor(tilePlacements = [], avatarPlacements = []) {
    this.tiles = new Array(BOARD_SIZE).fill(new Array(BOARD_SIZE).fill(null));
    this.avatars = {};

    tilePlacements.forEach(this.placeTile);
    avatarPlacements.forEach(this.addAvatar);
  }

  placeTile(tilePlacement) {
    const { tile, coords } = tilePlacement;
    const { x, y } = coords;
    const currentTile = this.tiles[x][y];
    if (currentTile) {
      throw 'Tile already exists at coords!';
    }
    this.tiles[x][y] = tile;
  }

  addAvatar(avatarPlacement) {
    const { player, color, coords, position } = avatarPlacement;
    const { id } = player;
    this.avatars[id] = new Avatar(id, color, coords, position);
  }

  getState() {
    return null;
    //return new Jersey();
  }
}

module.exports = Board;
