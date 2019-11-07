const getTileFromLetters = require('../../Common/utils/getTileFromLetters');
const { tiles } = require('../../Common/__tests__');
const { Coords, RuleChecker, TilePlacement } = require('../../Common');
const Player = require('../../Player/Player');

/**
 * Handles validating whether a given move is legal for a given
 * board state. This will either print `"legal"` if the move is
 * legal, or `"illegal"` if the move is illegal.
 *
 * @param {BoardState} boardState the current state of the board
 * @param {array} move the move given from STDIN
 */
const handleTurns = (boardState, move) => {
  const [action, ...playerHand] = move;
  const [color, tileIndex, rotation, x, y] = action;

  const player = new Player(color, color);
  player.receiveHand(playerHand.map(idx => getTileFromLetters(tiles[idx])));

  const tile = getTileFromLetters(tiles[tileIndex]).rotate(rotation / 90);
  const coords = new Coords(x, y);
  const tilePlacement = new TilePlacement(tile, coords);

  if (RuleChecker.checkPlacementLegality(boardState, tilePlacement, player)) {
    console.log(JSON.stringify('legal'));
  } else {
    console.log(JSON.stringify('illegal'));
  }
};

module.exports = handleTurns;
