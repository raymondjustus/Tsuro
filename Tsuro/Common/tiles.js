const RenderUtils = require('./renderUtils');
const { DIRECTIONS_CLOCKWISE } = require('./utils/constants');
require('./utils/polyfills');

class Tile {
  /**
   * Creates a new Tile, with the given paths.
   *
   * @param {Path[]} [paths=[]] the paths of the tile
   */
  constructor(paths = []) {
    this.paths = paths;
  }

  /**
   * Returns a new copy of this tile.
   *
   * @param {number} [rotations] rotations to perform on the new copy
   * @returns {Tile} a copy of this tile
   */
  copy(rotations = 0) {
    const tileCopy = new Tile(this.paths.map(path => path.copy()));
    if (rotations > 0) {
      tileCopy.rotate(rotations);
    }
    return tileCopy;
  }

  /**
   * Gets the ending position of the given starting position on the tile.
   *
   * @param {Position} position the chosen starting position
   * @returns {Position} the respective ending position
   */
  getEndingPosition(position) {
    return this.paths.first(path => path.getEndingPosition(position));
  }

  /**
   * Checks exact match on pathways between this tile and the given one.
   *
   * @param {Tile} tile the tile to check equality against
   * @returns {boolean} whether the given tile is equal to this one
   */
  isEqualTo(tile) {
    return this.paths.every(path => tile.paths.some(otherPath => otherPath.isEqualTo(path)));
  }

  /**
   * Checks the equality of this tile versus the given, allowing for a
   * difference in rotations.
   *
   * @param {Tile} tile the tile to check equality against
   * @returns {boolean} whether the given tile is equal to this one
   */
  isEqualToRotated(tile) {
    return (
      this.isEqualTo(tile) ||
      this.isEqualTo(tile.copy(1)) ||
      this.isEqualTo(tile.copy(2)) ||
      this.isEqualTo(tile.copy(3))
    );
  }

  /**
   * Rotates the tile 90 degrees clockwise per number of
   * rotations given.
   *
   * @param {number} rotations the amount of 90-degree
   * clockwise rotations to perform
   * @returns {Tile} this tile, rotated
   */
  rotate(rotations) {
    const actualRotations = rotations % DIRECTIONS_CLOCKWISE.length;
    if (actualRotations > 0) {
      this.paths = this.paths.map(path => {
        path.rotate(actualRotations);
        return path;
      });
    }
    return this;
  }

  /**
   * Renders a tile to the given D3 selection with the given
   * parameters.
   *
   * @param {d3.Selection} selection the current D3 selection
   * @param {number} x the starting X position
   * @param {number} y  the starting Y position
   * @param {number} size  the total size of the tile
   * (equivalent to width or height)
   */
  render(selection, x, y, size) {
    const renderUtils = new RenderUtils(x, y, size);
    const group = selection.append('g');

    /**
     * Renders a square to the selection group with the given
     * class name.
     *
     * @param {string} className the class of the rendered square
     * @returns {d3.Selection} the rendered square
     */
    const renderSquare = className =>
      group
        .append('rect')
        .attr('class', className)
        .attr('x', x)
        .attr('y', y)
        .attr('width', size)
        .attr('height', size);

    /**
     * Renders the tile's background.
     */
    const renderBackground = () => {
      const isEmpty = !this.paths.length;
      renderSquare('tile-bg').classed('tile-bg--empty', isEmpty);
    };

    /**
     * Renders the tile's border.
     */
    const renderBorder = () => {
      renderSquare('border');
    };

    /**
     * Renders a path from a given starting point to a given
     * ending point.
     *
     * @param {number[]} start The starting point of the path
     * @param {number[]} end The ending point of the path
     * @param {string} color The color of the path
     */
    const getPathCommands = (start, end) => {
      const startCoords = renderUtils.getPositionCoords(start);
      const endCoords = renderUtils.getPositionCoords(end);

      /**
       * Gets the mid points of a path. This is used to achieve
       * smoothly curved lines that blend into adjacent tiles.
       *
       * @returns {number[][]} an array of mid points
       */
      const getMidPoints = () => {
        let [midX1, midY1] = startCoords;
        let [midX2, midY2] = endCoords;

        /**
         * Gets the closest quarter value. If the value is 1, it'll
         * return 0.75; otherwise, it'll return 0.25.
         *
         * @param {number} val the value to check
         * @returns {number} the closest quarter value
         */
        const getClosestQuarterValue = val => (val === 1 ? 0.75 : 0.25);

        /**
         * Checks if value is 0 or 1, on a scale from 0 to 1.
         *
         * @param {number} val the value to check
         * @returns {boolean} whether value is 0 or 1
         */
        const isZeroOrOne = val => val % 1 === 0;

        if (midY1 === midY2 && isZeroOrOne(midY1)) {
          midY1 = midY2 = getClosestQuarterValue(midY1);
        } else if (isZeroOrOne(midX1) && isZeroOrOne(midX2)) {
          midX1 = getClosestQuarterValue(midX1);
          midX2 = getClosestQuarterValue(midX2);
        } else if (isZeroOrOne(midX1)) {
          midY2 = midY1;
        } else if (isZeroOrOne(midX2)) {
          midY1 = midY2;
        } else {
          midY1 = getClosestQuarterValue(midY1);
          midY2 = getClosestQuarterValue(midY2);
        }

        return [[midX1, midY1], [midX2, midY2]];
      };

      const points = [startCoords, ...getMidPoints(), endCoords];

      return renderUtils.getDrawCommands(points);
    };

    /**
     * Renders a path with the given class name and path commands.
     *
     * @param {string} className the class of the rendered path
     * @param {string} pathCommands the commands that control the
     * direction of the path as an svg draws them
     * @returns {d3.Selection} the rendered path
     */
    const renderPath = (className, pathCommands) =>
      group
        .append('path')
        .attr('class', className)
        .attr('d', pathCommands);

    // Renders background
    renderBackground();

    // Creates path commands and draws path shadows
    const paths = this.paths.map(path => {
      const pathCommands = getPathCommands(path.start, path.end);
      renderPath('path__shadow', pathCommands);
      return pathCommands;
    });

    // Renders paths
    paths.forEach(pathCommands => {
      renderPath('path', pathCommands);
    });

    // Renders border
    renderBorder();

    return group;
  }
}

module.exports = Tile;
