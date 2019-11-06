const getInput = require('../../3/src/getInput.js');
const handlePlacements = require('../../3/src/handlePlacements');
const handleTurns = require('./handleTurns.js');

const main = () => {
  // getInput().then(handlePlacements);

  getInput().then(placement => {
    const moves = placement.slice(0, placement.length - 1);
    const command = placement[placement.length - 1];
    // console.log(`this ->${moves}`);
    const board = handlePlacements(moves, true);
    handleTurns(board.getState(), command);
  });
};

module.exports = main;
