exports.BOARD_SIZE = 10;

exports.COLORS = {
  BLACK: '#000000',
  BROWN: '#7b2a26',
  GRAY: '#eeeeee',
  GREEN: '#63af33',
  RED: '#bf2952',
  WHITE: '#ffffff',
  YELLOW: '#d2b53c',
};

const DIRECTIONS = {
  NORTH: 'north',
  EAST: 'east',
  SOUTH: 'south',
  WEST: 'west',
};
exports.DIRECTIONS = DIRECTIONS;

exports.DIRECTIONS_CLOCKWISE = [
  DIRECTIONS.NORTH,
  DIRECTIONS.EAST,
  DIRECTIONS.SOUTH,
  DIRECTIONS.WEST,
];

exports.GAME_STATUS = {
  WAITING: 0,
  CURRENT_TURN: 1,
  GAME_OVER: 2,
};

const LETTERS = 'ABCDEFGH'.split('');
exports.LETTERS = LETTERS;

exports.LETTERS_MAP = LETTERS.reduce(
  (acc, letter, i) =>
    Object.assign(acc, {
      [letter]: i,
    }),
  {}
);

exports.PORTS = {
  ZERO: 0,
  ONE: 1,
};
