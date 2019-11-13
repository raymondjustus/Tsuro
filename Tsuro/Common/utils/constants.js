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
  BOARD: '#E3A865',
  BORDER: '#583C14',
  GRAY: '#eeeeee',
  WHITE: '#ffffff',
  TILE: '#936D36',
  PATH: '#FCE8B8',
};
exports.RENDER_COLORS = RENDER_COLORS;

exports.RENDER_STYLES = `
  .border, .port, .avatar {
    stroke: ${RENDER_COLORS.BORDER};
    stroke-width: 1;
  }

  .avatar__shadow {
    fill: ${RENDER_COLORS.PATH};
  }

  .border {
    fill: none;
  }

  .background {
    fill: ${RENDER_COLORS.TILE};
  }

  .background--empty {
    fill: ${RENDER_COLORS.BOARD};
  }

  .dead {
    opacity: 0.75;
  }

  .port {
    fill: ${RENDER_COLORS.WHITE};
  }

  .path__shadow {
    fill: none;
    stroke: ${RENDER_COLORS.BORDER};
    stroke-width: 5;
    opacity: 0.5;
  }

  .path {
    fill: none;
    stroke: ${RENDER_COLORS.PATH};
    stroke-width: 3;
  }
`;
