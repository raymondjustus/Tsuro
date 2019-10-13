const fs = require('fs');
const path = require('path');
const D3Node = require('d3-node');

const RENDER_DIR = path.resolve(__dirname, '..', '1');

class Tile {
  /**
   * Gets the linear scale for rendering on a single tile.
   *
   * @param {number} min the minimum point of the range
   * @param {number} size the size of the tile
   * @returns {d3.ScaleLinear} the linear scale of a given
   * axis, from 0 to 1
   */
  _getRenderScale(min, size) {
    return new D3Node().d3
      .scaleLinear()
      .domain([0, 1])
      .range([min, min + size]);
  }

  /**
   * Renders a tile to the given SVG group with the given
   * parameters.
   *
   * @param {SVGGElement} g the SVG group element to render
   * the tile to
   * @param {number} x the starting X position
   * @param {number} y  the starting Y position
   * @param {number} width  the total width of the tile
   * @param {number} height the total height of the tile
   */
  render(g, x, y, width, height) {
    const xScale = this._getRenderScale(x, width);
    const yScale = this._getRenderScale(y, height);

    const PORTS = {
      NORTH: [[1 / 3, 0], [2 / 3, 0]],
      EAST: [[0, 1 / 3], [0, 2 / 3]],
      SOUTH: [[1 / 3, 1], [2 / 3, 1]],
      WEST: [[1, 1 / 3], [1, 2 / 3]],
    };

    /**
     * Renders the tile's background.
     */
    const renderBackground = () => {
      g.append('rect')
        .attr('class', 'background')
        .attr('x', x)
        .attr('y', y)
        .attr('width', width)
        .attr('height', height);
    };

    /**
     * Renders a circle port on the tile.
     *
     * @param {number} x the x position of the port (from a
     * scale of 0 to 1)
     * @param {number} y the y position of the port (from a
     * scale of 0 to 1)
     */
    const renderPort = (x, y) => {
      g.append('circle')
        .attr('class', 'port')
        .attr('cx', xScale(x))
        .attr('cy', yScale(y))
        .attr('r', 6);
    };

    renderBackground();
    Object.keys(PORTS).forEach(direction => {
      PORTS[direction].forEach(([x, y]) => {
        renderPort(x, y);
      });
    });
  }

  /**
   * Renders a tile to the render directory, given a filename.
   *
   * @param {string} fileName the name of the file (sans extension)
   */
  renderToFile(fileName) {
    const size = 300;
    const padding = 20;
    const renderSize = size - 2 * padding;

    const d3n = new D3Node({
      styles: `
        .background, .port {
          stroke: #000000;
          stroke-width: 1;
        }

        .background {
          fill: #eeeeee;
        }

        .port {
          fill: #ffffff;
        }
      `,
    });
    const svg = d3n.createSVG(size, size);

    this.render(svg, padding, padding, renderSize, renderSize);

    const svgFile = fs.createWriteStream(path.resolve(RENDER_DIR, `${fileName}.svg`));
    svgFile.write(d3n.svgString());
    svgFile.end();
  }
}

module.exports = Tile;
