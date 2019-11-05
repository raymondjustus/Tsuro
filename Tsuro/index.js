const Referee = require('./Admin/Referee');
const Player = require('./Player/Player');
const DumbStrategy = require('./Player/Strategy/DumbStrategy');

const jack = new Player('jack', 'Jack', DumbStrategy);
const jill = new Player('jill', 'Jill', DumbStrategy);

const referee = new Referee();

referee.addPlayer(jack);
referee.addPlayer(jill);
referee.notifyPlayersOfColors();
referee.changePlayer();
