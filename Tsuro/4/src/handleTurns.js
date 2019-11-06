const getTileFromLetters = require('../../Common/utils/getTileFromLetters');
const { tiles } = require('../../Common/__tests__');
const { Coords, Player, RuleChecker, TilePlacement } = require('../../Common');

const handleTurns = (boardState, move) => {
  const [action, ...playerHand] = move;
  const [color, tileIndex, rotation, x, y] = action;
  const coords = new Coords(x, y);
  const player = new Player(color, color);
  player.hand = playerHand.map(idx => getTileFromLetters(tiles[idx]));
  const tile = getTileFromLetters(tiles[tileIndex]).rotate(rotation / 90);
  const tilePlacement = new TilePlacement(tile, coords);
  if (RuleChecker.canTakeAction(boardState, tilePlacement, player)) {
    console.log(JSON.stringify('legal'));
  } else {
    console.log(JSON.stringify('illegal'));
  }
};

module.exports = handleTurns;
