const getInput = require('../../Common/__tests__/getInput');
const handlePlacements = require('../../Common/__tests__/handlePlacements');
const handleTurns = require('./handleTurns');

const main = () => {
  getInput().then(moves => {
    const command = moves.pop();
    const board = handlePlacements(moves, true);
    handleTurns(board.getState(), command);
  });
};

module.exports = main;
