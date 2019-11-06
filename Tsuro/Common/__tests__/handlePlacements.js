const { Board, Coords, Player } = require('..');
const {
  getEmptyBoardArray,
  getLetterFromPosition,
  getPositionFromLetter,
  getTileFromLetters,
} = require('../utils');
const { tiles } = require('.');
const getMessage = require('../../3/src/getMessage');
const isValidPlacement = require('../../3/src/isValidPlacement');
const { COLORS } = require('../../3/src/constants');

/**
 * Handles parsing the placements as directed by the user, and using them on
 * a board. Then, prints responses for each available avatar color.
 *
 * @param {array[]} placements the array of placement instructions
 * @param {boolean} printResponses is a flag whether this will print out the board's response to those moves
 *
 * @returns {Board} once all the given placements have taken place.
 */
const handlePlacements = (placements, printResponses = false) => {
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
     * Helper function for placing tiles on the board.
     *
     * @param {number} tileIndex the index of the tile to choose from, from 0-34
     * @param {number} rotation the rotation amount of the tile, from 0-270 by
     * 90 degree increments
     * @param {number} x the x position of the tile
     * @param {number} y the y position of the tile
     * @param {boolean} [skipUpdate=false] whether to skip board updates
     */
    const placeTile = (tileIndex, rotation, x, y, skipUpdate = false) => {
      const coords = new Coords(x, y);
      const tile = getTileFromLetters(tiles[tileIndex]).rotate(rotation / 90);

      board.placeTile(tile, coords, skipUpdate);
      jsonBoard[x][y] = { tileIndex, rotation };
    };

    /**
     * Handles an intermediate placement, placing only a tile.
     *
     * @param {array} placement the intermediate placement JSON array
     */
    const handleIntermediatePlacement = ([color, tileIndex, rotation, x, y]) => {
      if (board.getAvatar(color)) {
        placeTile(tileIndex, rotation, x, y);
      }
    };

    /**
     * Handles an initial placement, placing a tile and avatar together.
     *
     * @param {array} placement the initial placement JSON array
     */
    const handleInitialPlacement = ([tileIndex, rotation, color, port, x, y]) => {
      placeTile(tileIndex, rotation, x, y, true);

      const player = new Player(color, color);
      const coords = new Coords(x, y);
      const position = getPositionFromLetter(port);
      board.placeAvatar(player, color, coords, position);
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
    console.log(getMessage('Invalid JSON ', placements));
  }
};

module.exports = handlePlacements;
