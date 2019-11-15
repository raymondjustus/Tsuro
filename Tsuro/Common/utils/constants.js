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
  HIGHLIGHT: '#ffff00',
  WHITE: '#ffffff',
  TILE: '#936D36',
  PATH: '#FCE8B8',
};
exports.RENDER_COLORS = RENDER_COLORS;

exports.RENDER_STYLES = `
  .avatar, .border, .port {
    stroke: ${RENDER_COLORS.BORDER};
    stroke-width: 1;
  }

  .avatar__highlight {
    fill: ${RENDER_COLORS.BOARD};
    stroke: ${RENDER_COLORS.BOARD};
    stroke-width: 7;
  }

  .avatar__shadow {
    fill: ${RENDER_COLORS.PATH};
    stroke: ${RENDER_COLORS.PATH};
    stroke-width: 5;
  }

  .background {
    fill: ${RENDER_COLORS.WHITE};
  }

  .border {
    fill: none;
  }

  .dead {
    opacity: 0.5;
  }

  .port {
    fill: ${RENDER_COLORS.WHITE};
  }

  .path {
    fill: none;
    stroke: ${RENDER_COLORS.PATH};
    stroke-width: 3;
  }

  .path__shadow {
    fill: none;
    opacity: 0.5;
    stroke: ${RENDER_COLORS.BORDER};
    stroke-width: 7;
  }

  .tile__highlight {
    fill: ${RENDER_COLORS.HIGHLIGHT};
    stroke: ${RENDER_COLORS.HIGHLIGHT};
    stroke-width: 7;
    opacity: 0.3;
  }

  .tile-bg {
    fill: ${RENDER_COLORS.TILE};
  }

  .tile-bg--empty {
    fill: ${RENDER_COLORS.BOARD};
  }

  text {
    fill: ${RENDER_COLORS.BLACK};
    font-family: 'Helvetica', sans-serif;
    font-size: 16px;
    transform: translate(0, 12px);
  }

  text tspan {
    font-weight: 600;
  }
`;
