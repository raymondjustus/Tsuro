/* eslint-disable no-unused-vars */

const path = require('path');
const { Observer, Referee } = require('./Admin');
const Player = require('./Player/Player');
const DumbStrategy = require('./Player/Strategy/DumbStrategy');

const jack = new Player('jack', 'Jack', DumbStrategy);
const jill = new Player('jill', 'Jill', DumbStrategy);
const wirt = new Player('wirt', 'Wirt', DumbStrategy);
const greg = new Player('greg', 'Greg', DumbStrategy);
const woodsman = new Player('woodsman', 'Woodsman', DumbStrategy);
const beast = new Player('beast', 'Beast', DumbStrategy);

const referee = new Referee();
const observer = new Observer();

referee.addObserver(observer);
referee.addPlayer(jack); // Not enough players
referee.addPlayer(jill); // Jill wins
referee.addPlayer(wirt); // Wirt wins
// referee.addPlayer(greg); // Jill wins
// referee.addPlayer(woodsman); // Jack wins
// referee.addPlayer(beast); // Max players reached
referee.notifyPlayersOfColors();
referee.runGame();

observer.renderToFile('final.png');
