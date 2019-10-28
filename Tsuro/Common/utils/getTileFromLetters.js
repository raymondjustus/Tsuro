const Path = require('../path');
const Tile = require('../tiles');
const { getPositionFromLetter } = require('./getPosition');

/**
 * Gets a Tile object from the letter-specified tile JSON.
 *
 * @param {string[][]} tileJSON the letter-specified tile
 * JSON
 * @returns {Tile} the corresponding Tile object
 */
const getTileFromLetters = tileJSON => {
  const paths = tileJSON.map(
    ([start, end]) => new Path(getPositionFromLetter(start), getPositionFromLetter(end))
  );
  return new Tile(paths);
};

module.exports = getTileFromLetters;
