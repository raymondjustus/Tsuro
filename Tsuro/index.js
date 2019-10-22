const { Board, Coords, InitialPlacement, Path, Player, Position, Tile } = require('./Common');
const { COLORS, DIRECTIONS, PORTS } = require('./Common/utils/constants');

const playerA = new Player('a', 'Josh');

const tile = new Tile([
  new Path(new Position(DIRECTIONS.NORTH, PORTS.ZERO), new Position(DIRECTIONS.SOUTH, PORTS.ZERO)),
  new Path(new Position(DIRECTIONS.NORTH, PORTS.ONE), new Position(DIRECTIONS.SOUTH, PORTS.ONE)),
  new Path(new Position(DIRECTIONS.EAST, PORTS.ZERO), new Position(DIRECTIONS.WEST, PORTS.ZERO)),
  new Path(new Position(DIRECTIONS.EAST, PORTS.ONE), new Position(DIRECTIONS.WEST, PORTS.ONE)),
]);

const placements = [
  new InitialPlacement(
    tile,
    new Coords(0, 0),
    playerA,
    COLORS.GREEN,
    new Position(DIRECTIONS.WEST, PORTS.ZERO)
  ),
];

const b = new Board(placements);

b.placeTile(tile, new Coords(1, 0));
console.log(b.getState().getAvatars());
