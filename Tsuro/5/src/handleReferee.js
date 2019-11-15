const Referee = require('../../Admin/Referee');
const Player = require('../../Player/Player');
const DumbStrategy = require('../../Player/Strategy/DumbStrategy');

/**
 * Handles the creation and running of a game through a referee.
 * @param {string[]} playerNames names who are playing. Should be 3 - 5 players.
 */
const handleReferee = playerNames => {
  const referee = new Referee();
  const players = [];
  playerNames.forEach(name => {
    const player = new Player(name, name, DumbStrategy);
    player.setPlayerPrintResultsStatus(false);
    players.push(player);
    try {
      referee.addPlayer(player);
    } catch (error) {
      console.error(`Adding Players to referee: ${error}`);
    }
  });

  referee.notifyPlayersOfColors();
  referee.runGame();

  const winners = [referee.getWinners()];

  Object.keys(referee.removedPlayersForTurn).forEach(ending => {
    winners.push(referee.removedPlayersForTurn[ending]);
  });

  const losers = [];
  const nonDisqualiedPlayers = winners => [].concat(...winners);
  for (let i = nonDisqualiedPlayers.length; i--; ) {
    if (winners.indexOf(nonDisqualiedPlayers[i]) === -1) {
      if (nonDisqualiedPlayers[i]) {
        losers.push(nonDisqualiedPlayers[i]);
      }
    }
  }

  const output = { winners: winners, losers: losers };
  console.log(JSON.stringify(output));
};

module.exports = handleReferee;
