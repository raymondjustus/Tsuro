class TilePlacement {
  constructor(tile, coords) {
    this.coords = coords;
    this.tile = tile;
  }
}

class InitialPlacement extends TilePlacement {
  constructor(tile, coords, player, color, position) {
    super(tile, coords);
    this.player = player;
    this.color = color;
    this.position = position;
  }
}

exports.TilePlacement = TilePlacement;
exports.InitialPlacement = InitialPlacement;
