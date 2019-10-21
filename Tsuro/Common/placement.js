class Placement {
  constructor(coords) {
    this.coords = coords;
  }
}

class TilePlacement extends Placement {
  constructor(tile, coords) {
    super(coords);
    this.tile = tile;
  }
}

class AvatarPlacement extends Placement {
  constructor(player, color, coords, position) {
    super(coords);
    this.player = player;
    this.color = color;
    this.position = position;
  }
}

exports.TilePlacement = TilePlacement;
exports.AvatarPlacement = AvatarPlacement;
