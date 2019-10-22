const { Path, Tile } = require('../../Common');
const { getLetterFromPosition, getPositionFromLetter } = require('../../Common/utils');
const printMessage = require('./printMessage');
const tiles = require('./tiles');

const VALID_DEGREES = new Set([0, 90, 180, 270]);

/**
 * Gets a Tile object from the letter-specified tile JSON.
 *
 * @param {string[][]} tileJSON the letter-specified tile
 * JSON
 * @returns {Tile} the corresponding Tile object
 */
const getTile = tileJSON => {
  const paths = tileJSON.map(
    ([start, end]) => new Path(getPositionFromLetter(start), getPositionFromLetter(end))
  );
  return new Tile(paths);
};

/**
 * Prints the ending port given a tile index, degree of rotation,
 * and port letter.
 *
 * @param {number} tileIndex the index of the JSON tile to
 * reference
 * @param {number} degrees the degrees amount to rotate the
 * tile from 0-270, using 90 degree increments
 * @param {string} port the letter-specified port representing
 * ports North-0 to West-1 using letters A-H, respectively and
 * clockwise
 */
const getEndingPort = (tileIndex, degrees, port) => {
  const tileJSON = tiles[tileIndex];
  if (!tileJSON) {
    throw 'Tile does not exist at index.';
  }
  const tile = getTile(tileJSON);

  if (!VALID_DEGREES.has(degrees)) {
    throw 'Cannot rotate tile given degrees.';
  }
  tile.rotate(degrees / 90);

  let position;
  try {
    position = getPositionFromLetter(port);
  } catch (err) {
    throw 'Invalid port.';
  }

  const endingPosition = tile.getEndingPosition(position);
  const endingLetterPort = getLetterFromPosition(endingPosition);

  printMessage('if ', port, ' is the entrance, ', endingLetterPort, ' is the exit.');
};

module.exports = getEndingPort;
