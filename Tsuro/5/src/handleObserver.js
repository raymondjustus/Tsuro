const Observer = require('../../Admin/Observer');
const Player = require('../../Player/Player');
const path = require('path');

/**
 * Creates a view of the game through a gamestate.
 * @param {string[]} gameState the game state specification.
 * @param {string[]} turnSpec the turn requested by the given player.
 * TODO: Don't remember how to represent optional intake ^^^
 */
const handleObserver = (gameState, turnSpec = null) => {
  
  const playa = new Player();

  if (turnSpec) {
    //TODO: Making a move
  }

  //make an observer
  const observer = new Observer();
  //update its boardstate to be the given one
  observer.updateBoardState(gameState);
  //render it
  observer.render(path.resolve(__dirname, 'tsuro.svg'));
  
};

module.exports = handleObserver;