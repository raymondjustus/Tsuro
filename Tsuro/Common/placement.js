class TilePlacement {
  /**
   * Creates a new TilePlacement.
   *
   * @param {Tile} tile the tile to place
   * @param {Coords} coords the coordinates at which the
   * tile should be places
   */
  constructor(tile, coords) {
    this.coords = coords;
    this.tile = tile;
  }
}

class InitialPlacement extends TilePlacement {
  /**
   * Creates a new InitialPlacement, marking the initial move
   * from the player.
   *
   * @param {Tile} tile the tile to place
   * @param {Coords} coords the coordinates at which the
   * tile should be places
   * @param {Player} player the player making the initial move
   * @param {string} color the color of the player's avatar
   * @param {Position} position the position of the player's
   * avatar on the tile
   */
  constructor(tile, coords, player, color, position) {
    super(tile, coords);
    this.player = player;
    this.color = color;
    this.position = position;
  }
}

exports.TilePlacement = TilePlacement;
exports.InitialPlacement = InitialPlacement;
