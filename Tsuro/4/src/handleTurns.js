const ruleChecker = require('../../Common/rules.js');
const TilePlacement = require('../../Common/placement.js');
const getTileFromLetters = require('../../Common/utils/getTileFromLetters.js');
const { tiles } = require('../../Common/__tests__');
const Coords = require('../../Common/coords.js');
const Player = require('../../Common/player.js');

const handleTurns = (boardState, move) => {
  const playerHand = move.slice(1, 3);
  const action = move[0];
  const color = action[0];
  const tileIndex = action[1];
  const rotation = action[2];
  const coords = new Coords(action[3], action[4]);
  const player = new Player(color, color);
  player.hand = [
    getTileFromLetters(tiles[playerHand[0]]),
    getTileFromLetters(tiles[playerHand[1]]),
  ];
  const tile = getTileFromLetters(tiles[tileIndex]).rotate(rotation / 90);
  const tilePlacement = new TilePlacement(tile, coords);
  if (ruleChecker.canTakeAction(boardState, tilePlacement, player)) {
    console.log('legal');
  } else {
    console.log('illegal');
  }
};

module.exports = handleTurns;
