const D3Node = require('d3-node');
const { DIRECTIONS } = require('./utils/constants');

const PORT_POINTS = {
  [DIRECTIONS.NORTH]: [[1 / 3, 0], [2 / 3, 0]],
  [DIRECTIONS.EAST]: [[1, 1 / 3], [1, 2 / 3]],
  [DIRECTIONS.SOUTH]: [[2 / 3, 1], [1 / 3, 1]],
  [DIRECTIONS.WEST]: [[0, 2 / 3], [0, 1 / 3]],
};

class RenderUtils {
  /**
   * @constructor
   * Creates a new RenderUtils object for the given specification.
   *
   * @param {number} x the starting x-position
   * @param {number} y the starting y-position
   * @param {number} size the size of the render area
   */
  constructor(x, y, size) {
    this._d3 = new D3Node().d3;

    this.scaleX = this._getRenderScale(x, size);
    this.scaleY = this._getRenderScale(y, size);

    this._getDrawCommands = this._d3
      .line()
      .x(([x]) => this.scaleX(x))
      .y(([, y]) => this.scaleY(y))
      .curve(this._d3.curveBasis);
  }

  /**
   * @private
   * Gets the linear scale for rendering on a single tile.
   *
   * @param {number} min the minimum point of the range
   * @param {number} size the size of the tile
   * @returns {d3.ScaleLinear<number, number>} the linear scale
   * of a given axis, from 0 to 1
   */
  _getRenderScale(min, size) {
    return this._d3
      .scaleLinear()
      .domain([0, 1])
      .range([min, min + size]);
  }

  /**
   * Gets the draw commands for an svg `path` from an array of
   * points. It draws a path using a basis curve.
   *
   * @param {number[][]} points an array of points to convert
   * to draw commands
   * @returns {string} the draw commands to pass to the `d`
   * attribute of a path
   */
  getDrawCommands(points) {
    return this._getDrawCommands(points);
  }

  /**
   * Gets the render coordinates for a given position.
   *
   * @param {Position} position the position to fetch render
   * coordinates for
   * @returns {[number, number]} the x and y render coordinates
   * within an array
   */
  getPositionCoords(position) {
    const { direction, port } = position;
    return PORT_POINTS[direction][port];
  }
}

module.exports = RenderUtils;
