const fs = require('fs');
const path = require('path');
const D3Node = require('d3-node');

const PORTS = {
  NORTH: 'north',
  EAST: 'east',
  SOUTH: 'south',
  WEST: 'west',
};

const RENDER_DIR = path.resolve(__dirname, '..', '1');

const COLORS = {
  BROWN: '#7b2a26',
  RED: '#bf2952',
  GREEN: '#63af33',
  YELLOW: '#d2b53c',
};

const D3_NODE_OPTIONS = {
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

    .path {
      fill: none;
      stroke-width: 3;
    }
  `,
};

class Tile {
  constructor() {
    this.d3Node = new D3Node(D3_NODE_OPTIONS);
    this.d3 = this.d3Node.d3;

    // Temporary paths definition
    this.paths = [
      {
        start: [PORTS.NORTH, 0],
        end: [PORTS.NORTH, 1],
        color: COLORS.BROWN,
      },
      {
        start: [PORTS.WEST, 0],
        end: [PORTS.SOUTH, 0],
        color: COLORS.RED,
      },
      {
        start: [PORTS.EAST, 0],
        end: [PORTS.SOUTH, 1],
        color: COLORS.YELLOW,
      },
      {
        start: [PORTS.WEST, 1],
        end: [PORTS.EAST, 1],
        color: COLORS.GREEN,
      },
    ];
  }

  /**
   * Gets the linear scale for rendering on a single tile.
   *
   * @param {number} min the minimum point of the range
   * @param {number} size the size of the tile
   * @returns {d3.ScaleLinear} the linear scale of a given
   * axis, from 0 to 1
   */
  _getRenderScale(min, size) {
    return this.d3
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

    const PORT_POINTS = {
      [PORTS.NORTH]: [[1 / 3, 0], [2 / 3, 0]],
      [PORTS.EAST]: [[1, 1 / 3], [1, 2 / 3]],
      [PORTS.SOUTH]: [[1 / 3, 1], [2 / 3, 1]],
      [PORTS.WEST]: [[0, 1 / 3], [0, 2 / 3]],
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
     * Renders a path from a given starting port to a
     * given ending port.
     *
     * @param {number[]} start The starting port of the path
     * @param {number[]} end The ending port of the path
     * @param {string} color The color of the path
     */
    const renderPath = (start, end, color) => {
      const lineFunction = this.d3
        .line()
        .x(([x]) => xScale(x))
        .y(([, y]) => yScale(y))
        .curve(this.d3.curveBasis);

      let midX1 = start[0];
      let midY1 = start[1];
      let midX2 = end[0];
      let midY2 = end[1];

      if (start[1] === end[1]) {
        if (start[1] === 0) {
          midY1 = midY2 = 0.25;
        } else if (start[1] === 1) {
          midY1 = midY2 = 0.75;
        }
      } else if ((start[0] === 0 && end[0] === 1) || (start[0] === 1 && end[0] === 0)) {
        midX1 = start[0] === 1 ? 0.75 : 0.25;
        midY1 = start[1];
        midX2 = end[0] === 1 ? 0.75 : 0.25;
        midY2 = end[1];
      } else if (start[0] === 0 || start[0] === 1) {
        midY1 = midY2 = start[1];
      } else if (end[0] === 0 || end[0] === 1) {
        midY1 = midY2 = end[1];
      } else {
        midX1 = start[0];
        midY1 = start[1] === 1 ? 0.75 : 0.25;
        midX2 = end[0];
        midY2 = end[1] === 1 ? 0.75 : 0.25;
      }

      g.append('path')
        .attr('class', 'path')
        .attr('stroke', color)
        .attr('d', lineFunction([start, [midX1, midY1], [midX2, midY2], end]));
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

    // Renders background
    renderBackground();

    // Renders paths
    this.paths.forEach(({ start, end, color }) => {
      renderPath(PORT_POINTS[start[0]][start[1]], PORT_POINTS[end[0]][end[1]], color);
    });

    // Renders ports
    Object.keys(PORT_POINTS).forEach(direction => {
      PORT_POINTS[direction].forEach(([x, y]) => {
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

    const svg = this.d3Node.createSVG(size, size);

    this.render(svg, padding, padding, renderSize, renderSize);

    const svgFile = fs.createWriteStream(path.resolve(RENDER_DIR, `${fileName}.svg`));
    svgFile.write(this.d3Node.svgString());
    svgFile.end();
  }
}

module.exports = Tile;
