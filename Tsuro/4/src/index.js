const { getInput, handlePlacements } = require('../../Common/__tests__');
const handleTurns = require('./handleTurns');

const main = () => {
  getInput().then(moves => {
    const command = moves.pop();
    const board = handlePlacements(moves, true);
    handleTurns(board.getState(), command);
  });
};

module.exports = main;
