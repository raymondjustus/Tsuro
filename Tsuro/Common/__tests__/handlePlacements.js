const { Board, Coords } = require('..');
const {
  getEmptyBoardArray,
  getLetterFromPosition,
  getPositionFromLetter,
  getTileFromLetters,
} = require('../utils');
const { tiles } = require('.');
const Player = require('../../Player/Player');
const getMessage = require('./getMessage');
const isValidPlacement = require('./isValidPlacement');
const { COLORS } = require('./constants');

/**
 * Handles parsing the placements as directed by the user, and using them on
 * a board. Then, prints responses for each available avatar color.
 *
 * @param {array[]} placements the array of placement instructions
 * @param {boolean} [printResponses = true] is a flag whether this will print out the board's response to those moves
 *
 * @returns {Board} once all the given placements have taken place.
 */
const handlePlacements = (placements, printResponses = true) => {
  const board = new Board();
  // for keeping track of tile index and rotation (only pertinent to testing suite)
  const jsonBoard = getEmptyBoardArray();

  /**
   * Uses the given placements array to make tile and avatar placements onto
   * the board.
   *
   * @param {array[]} placements the placements array
   *
   */
  const usePlacements = placements => {
    /**
     * Handles an intermediate placement, placing only a tile.
     *
     * @param {array} placement the intermediate placement JSON array
     */
    const handleIntermediatePlacement = ([color, tileIndex, rotation, x, y]) => {
      if (board.getAvatar(color)) {
        const coords = new Coords(x, y);
        const tile = getTileFromLetters(tiles[tileIndex]).rotate(rotation / 90);

        board.placeTile(tile, coords);
        jsonBoard[x][y] = { tileIndex, rotation };
      }
    };

    /**
     * Handles an initial placement, placing a tile and avatar together.
     *
     * @param {array} placement the initial placement JSON array
     */
    const handleInitialPlacement = ([tileIndex, rotation, color, port, x, y]) => {
      const player = new Player(color, color);
      player.setColor(color);

      const tile = getTileFromLetters(tiles[tileIndex]).rotate(rotation / 90);
      const coords = new Coords(x, y);
      const position = getPositionFromLetter(port);

      board.placeInitialTileAvatar(player, tile, coords, position);
      jsonBoard[x][y] = { tileIndex, rotation };
    };

    placements.forEach(placement => {
      if (isValidPlacement(placement, true)) {
        handleInitialPlacement(placement);
      } else if (isValidPlacement(placement, false)) {
        handleIntermediatePlacement(placement);
      } else {
        throw 'Invalid placement instruction';
      }
    });
  };

  /**
   * Gets the responses for each of the defined colors. Determines
   * whether the color was ever played, if it collided, if it exited,
   * or, if none of the above, the current position of the color.
   *
   * @returns {array[]} an array of responses
   */
  const getResponses = () =>
    COLORS.map(color => {
      const avatar = board.getAvatar(color);
      if (!avatar) {
        return [color, ' never played'];
      } else if (avatar.hasCollided()) {
        return [color, ' collided'];
      } else if (avatar.hasExited()) {
        return [color, ' exited'];
      }

      const {
        coords: { x, y },
        position,
      } = avatar;
      const port = getLetterFromPosition(position);

      const { tileIndex, rotation } = jsonBoard[x][y];
      return [color, tileIndex, rotation, port, x, y];
    });

  try {
    usePlacements(placements);
    if (printResponses) {
      const responses = getResponses();
      console.log(JSON.stringify(responses));
    }
    return board;
  } catch (err) {
    console.log(err);
    console.log(getMessage('Invalid JSON ', placements));
  }
};

module.exports = handlePlacements;
