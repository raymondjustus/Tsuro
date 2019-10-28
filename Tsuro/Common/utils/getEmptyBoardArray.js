const { BOARD_SIZE } = require('./constants');

const getEmptyBoardArray = () => {
  const board = [];
  for (let x = 0; x < BOARD_SIZE; x++) {
    board[x] = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      board[x][y] = null;
    }
  }
  return board;
};

module.exports = getEmptyBoardArray;
