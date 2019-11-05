const { BoardState } = require('./Common');
const { getTileFromLetters } = require('./Common/utils');
const { tiles } = require('./Common/__tests__');
const DumbStrategy = require('./Player/Strategy/DumbStrategy');

const boardState = new BoardState();
const hand = [0, 1, 2].map(idx => getTileFromLetters(tiles[idx]));

console.log(DumbStrategy.getInitialAction('a', hand, boardState));
