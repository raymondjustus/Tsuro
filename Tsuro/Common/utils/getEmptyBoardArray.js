const { BOARD_SIZE } = require('./constants');

/**
 * Gets an empty board array; that is, an array of
 * the given size filled with arrays of the given size
 * filled with `null`.
 *
 * @param {number} [size=BOARD_SIZE] the size of the board
 * to create
 * @returns {null[][]} the empty board array
 */
const getEmptyBoardArray = (size = BOARD_SIZE) => {
  const board = [];
  for (let x = 0; x < size; x++) {
    board[x] = [];
    for (let y = 0; y < size; y++) {
      board[x][y] = null;
    }
  }
  return board;
};

module.exports = getEmptyBoardArray;
