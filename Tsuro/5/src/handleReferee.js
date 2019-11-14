const Referee = require('../../Admin/Referee');
const Player = require('../../Player/Player');
const DumbStrategy = require('../../Player/Strategy/DumbStrategy');
const path = require('path');

/**
 * Handles the creation and running of a game through a referee.
 * @param {string[]} playerNames names who are playing. Should be 3 - 5 players.
 */
const handleReferee = playerNames => {
  const players = [];
  playerNames.forEach(name => {
    const temp = new Player(name, name, DumbStrategy);
    temp.setPlayerPrintResultsStatus(false);
    players.push(temp);
  });

  const referee = new Referee();

  players.forEach(player => {
    try {
      referee.addPlayer(player);
    } catch (error) {
      console.error(`Adding Players to referee: ${error}`);
    }
  });

  referee.notifyPlayersOfColors();
  referee.runGame();
  const winners = referee.getWinners();
  const losers = [];
  for (let i = playerNames.length; i--; ) {
    if (winners.indexOf(playerNames[i]) === -1) {
      losers.push(playerNames[i]);
    }
  }

  const output = { winners: [winners], losers: losers };
  console.log(JSON.stringify(output));

  referee.board.renderToFile(path.resolve(__dirname, 'final.svg'));
};

module.exports = handleReferee;
