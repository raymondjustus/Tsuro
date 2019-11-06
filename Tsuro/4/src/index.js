const getInput = require('../../3/src/getInput.js');
const handlePlacements = require('../../3/src/handlePlacements');
const handleTurns = require('./handleTurns.js');

const main = () => {
  getInput().then(placement => {
    const moves = placement.slice(0, placement.length - 1);
    const command = placement[placement.length - 1];
    const board = handlePlacements(moves, true);
    console.log(` ---- ${Object.keys(board.getState()._avatars)}`);
    handleTurns(board.getState(), command);
  });
};

module.exports = main;
