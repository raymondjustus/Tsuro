const path = require('path');
const Referee = require('./Admin/Referee');
const Player = require('./Player/Player');
const DumbStrategy = require('./Player/Strategy/DumbStrategy');

const jack = new Player('jack', 'Jack', DumbStrategy);
const jill = new Player('jill', 'Jill', DumbStrategy);
const harry = new Player('harry', 'Harry', DumbStrategy);

const referee = new Referee();

referee.addPlayer(jack);
referee.addPlayer(jill);
referee.addPlayer(harry);
referee.notifyPlayersOfColors();
referee.changePlayer();

referee.board.renderToFile(path.resolve(__dirname, 'final.svg'), 1000);
