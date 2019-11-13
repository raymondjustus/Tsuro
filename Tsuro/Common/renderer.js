const D3Node = require('d3-node');
const { DIRECTIONS } = require('./utils/constants');

class Renderer {
  constructor(x, y, size) {
    this._d3 = new D3Node().d3;

    this.PORT_POINTS = {
      [DIRECTIONS.NORTH]: [[1 / 3, 0], [2 / 3, 0]],
      [DIRECTIONS.EAST]: [[1, 1 / 3], [1, 2 / 3]],
      [DIRECTIONS.SOUTH]: [[2 / 3, 1], [1 / 3, 1]],
      [DIRECTIONS.WEST]: [[0, 2 / 3], [0, 1 / 3]],
    };

    this.scaleX = this._getRenderScale(x, size);
    this.scaleY = this._getRenderScale(y, size);
  }

  /**
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

  getPositionCoords(position) {
    const { direction, port } = position;
    return this.PORT_POINTS[direction][port];
  }

  getAllPositionCoords() {
    const coords = [];
    Object.keys(this.PORT_POINTS).forEach(direction => {
      this.PORT_POINTS[direction].forEach(([x, y]) => {
        coords.push([x, y]);
      });
    });
    return coords;
  }
}

module.exports = Renderer;
