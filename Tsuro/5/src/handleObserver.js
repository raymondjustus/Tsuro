const path = require('path');
const { Observer } = require('../../Admin');
const Player = require('../../Player/Player');
const { Board, InitialAction, IntermediateAction, Coords } = require('../../Common');
const { getPositionFromLetter, getTileFromLetters } = require('../../Common/utils');
const { isValidPlacement, tiles } = require('../../Common/__tests__');

/**
 * Renders the current state of a board given the moves.
 *
 * @param {any[][]} moves the game state specification, possibly ending
 * in a turn specification
 */
const handleObserver = moves => {
  const observer = new Observer();
  observer.updateCurrentTurn(moves.length);

  const lastIdx = moves.length - 1;
  let turnSpec;
  if (Array.isArray(moves[lastIdx][0])) {
    turnSpec = moves.pop();
  }

  const board = new Board();
  const playerColors = {};

  /**
   * Handles placing an avatar and tile on the board based on the given placement
   * spec, then returning a corresponding action.
   *
   * @param {[number, number, string, string, number, numer]} initialPlacement an initial
   * placement array specification
   * @returns {InitialAction} the corresponding initial action
   */
  const handleInitialPlacement = ([tileIdx, rotation, color, port, x, y]) => {
    const player = new Player(color, color);
    player.setColor(color);
    playerColors[color] = [color];
    observer.updateCurrentPlayerId(color);

    const tile = getTileFromLetters(tiles[tileIdx]).rotate(rotation / 90);
    const coords = new Coords(x, y);
    const position = getPositionFromLetter(port);

    board.placeInitialTileAvatar(player, tile, coords, position);

    return new InitialAction(tile, coords, position);
  };

  /**
   * Handles placing a tile on the board based on the given placement spec, then
   * returning a corresponding action.
   *
   * @param {[string, number, number, number, numer]} intermediatePlacement an
   * intermediate placement array specification
   * @returns {IntermediateAction} the corresponding intermediate action
   */
  const handleIntermediatePlacement = ([color, tileIdx, rotation, x, y]) => {
    observer.updateCurrentPlayerId(color);

    const tile = getTileFromLetters(tiles[tileIdx]).rotate(rotation / 90);
    const coords = new Coords(x, y);

    board.placeTile(tile, coords);

    return new IntermediateAction(tile, coords);
  };

  /**
   * Handles parsing placement specifications and updating the board accordingly.
   * Also updates the observer's last used action.
   *
   * @param {array} placement an array-based placement specification
   */
  const handlePlacement = placement => {
    let action;
    if (isValidPlacement(placement, true)) {
      action = handleInitialPlacement(placement);
    } else if (isValidPlacement(placement, false)) {
      action = handleIntermediatePlacement(placement);
    } else {
      throw 'Invalid placement instruction';
    }
    observer.updateLastAction(action);
  };

  moves.forEach(move => {
    handlePlacement(move);
  });

  if (turnSpec) {
    const [placement, ...hand] = turnSpec;
    const parsedHand = hand.map(idx => getTileFromLetters(tiles[idx]));
    observer.updateCurrentHand(parsedHand);
    handlePlacement(placement);
  }

  observer.setPlayerColors(playerColors);
  const boardState = board.getState();
  observer.updateState(boardState);

  const pathArg = process.argv[2];
  if (!pathArg) {
    throw 'Argument must be passed for output path';
  }
  observer.renderToFile(path.resolve(pathArg));
};

module.exports = handleObserver;
