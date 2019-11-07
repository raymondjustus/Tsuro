exports.BOARD_SIZE = 10;

exports.COLORS = {
  BLACK: 'black',
  BLUE: 'blue',
  GREEN: 'green',
  RED: 'red',
  WHITE: 'white',
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

const RENDER_COLORS = {
  BLACK: '#000000',
  GRAY: '#eeeeee',
  WHITE: '#ffffff',
};
exports.RENDER_COLORS = RENDER_COLORS;

exports.RENDER_STYLES = `
  .background, .port {
    stroke: ${RENDER_COLORS.BLACK};
    stroke-width: 1;
  }

  .background {
    fill: ${RENDER_COLORS.GRAY};
  }

  .port {
    fill: ${RENDER_COLORS.WHITE};
  }

  .path {
    fill: none;
    stroke: ${RENDER_COLORS.BLACK};
    stroke-width: 3;
  }
`;
