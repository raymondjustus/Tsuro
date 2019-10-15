const fs = require("fs");
const path = require("path");
const D3Node = require("d3-node");
const { COLORS, DIRECTIONS } = require("./constants");

const STYLES = `
  .background, .port {
    stroke: ${COLORS.BLACK};
    stroke-width: 1;
  }

  .background {
    fill: ${COLORS.GRAY};
  }

  .port {
    fill: ${COLORS.WHITE};
  }

  .path {
    fill: none;
    stroke-width: 3;
  }
`;

class Tile {
  constructor() {
    this.d3Node = new D3Node({ styles: STYLES });
    this.d3 = this.d3Node.d3;
    this.paths = [];
  }

  /**
   * Adds the 4 paths to this Tile
   * @param {{start, end}[]} pathways is a list of 4 {start,end} node
   *
   * each indedx is [(side, port), (side, port)]
   */
  addPaths(pathways) {
    //TODO: random colors for funsies

    this.paths = [
      {
        start: pathways[0][0],
        end: pathways[0][1],
        color: COLORS.BROWN
      },
      {
        start: pathways[1][0],
        end: pathways[1][1],
        color: COLORS.RED
      },
      {
        start: pathways[2][0],
        end: pathways[2][1],
        color: COLORS.YELLOW
      },
      {
        start: pathways[3][0],
        end: pathways[3][1],
        color: COLORS.GREEN
      }
    ];
  }

  /**
   * checks exact match on pathways between this tile and the given one
   * @param {Object} tile
   */
  checkTileEquality(tile) {
    // console.log("\n\nSTART NEW CHECK \n");
    let i = 0;

    let checks = [false, false, false, false];
    for (i; i < 4; i++) {
      let tilePath = tile.paths[i];
      // console.log("oPath: " + JSON.stringify(tilePath));
      let tileStart = JSON.stringify(tilePath.start);
      let tileEnd = JSON.stringify(tilePath.end);
      let j = 0;
      for (j; j < 4; j++) {
        let path = this.paths[j];
        let start = JSON.stringify(path.start);
        let end = JSON.stringify(path.end);
        // console.log("tPath: " + JSON.stringify(path));
        if (start == tileStart || start == tileEnd) {
          if (end == tileStart || end == tileEnd) {
            checks[i] = true;
            // console.log("checks out");
          } else {
            // console.log("bad bruh");
            return false;
          }
        } else {
          // console.log("no chance");
        }
      }
    }

    for (let k = 0; k < 4; k++) {
      // console.log("K = " + k + "  -  " + checks[k]);
      if (!checks[k]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Rotates the tile 90 degrees clockwise per number of
   * rotations given.
   *
   * @param {number} rotations the amount of 90-degree
   * clockwise rotations to perform
   */
  rotate(rotations) {
    const CLOCKWISE_DIRECTIONS = [
      DIRECTIONS.NORTH,
      DIRECTIONS.EAST,
      DIRECTIONS.SOUTH,
      DIRECTIONS.WEST
    ];

    const actualRotations = rotations % CLOCKWISE_DIRECTIONS.length;

    if (actualRotations > 0) {
      /**
       * Updates the given direction to reflect the number
       * of rotations (clockwise).
       *
       * @param {string} direction the direction to update
       * @returns {string} the final rotated direction
       */
      const rotateDirection = direction => {
        const idx = CLOCKWISE_DIRECTIONS.indexOf(direction);
        const newIdx = (idx + rotations) % CLOCKWISE_DIRECTIONS.length;
        return CLOCKWISE_DIRECTIONS[newIdx];
      };

      this.paths = this.paths.map(({ start, end, color }) => ({
        start: [rotateDirection(start[0]), start[1]],
        end: [rotateDirection(end[0]), end[1]],
        color
      }));
    }
  }

  /**
   * Returns a copy of a node that has been rotated
   * @param {number} rotations  the amount of 90=degree clockwise rotations to perform
   */
  newRotated(rotations) {
    let temp = new Tile();
    temp.paths = this.paths;
    temp.rotate(rotations);
    return temp;
  }

  /**
   * checks the equality of this tile vs the given allowing for a difference in rotations
   * @param {Object} tile
   */
  checkRotationalEquality(tile) {
    let zero = this.checkTileEquality(tile);
    let one = this.checkTileEquality(tile.newRotated(1));
    let two = this.checkTileEquality(tile.newRotated(2));
    let three = this.checkTileEquality(tile.newRotated(3));

    // console.log(zero + " " + one + " " + two + " " + three);

    // console.log("CHEAT TEST");
    // console.log(JSON.stringify(this.paths));
    // console.log(JSON.stringify(tile.newRotated(2).paths));
    // console.log(this.checkTileEquality(tile.newRotated(2)));
    // console.log("END CHEAT");

    return (
      this.checkTileEquality(tile) ||
      // console.log("\n ------------------ Rotate 1: -----------------") ||
      this.checkTileEquality(tile.newRotated(1)) ||
      // console.log("\n ------------------ Rotate 2: -----------------") ||
      this.checkTileEquality(tile.newRotated(2)) ||
      // console.log("\n ------------------ Rotate 3: -----------------") ||
      this.checkTileEquality(tile.newRotated(3))
    );
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
    return this.d3
      .scaleLinear()
      .domain([0, 1])
      .range([min, min + size]);
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
    const scaleX = this._getRenderScale(x, size);
    const scaleY = this._getRenderScale(y, size);

    const PORT_POINTS = {
      [DIRECTIONS.NORTH]: [[1 / 3, 0], [2 / 3, 0]],
      [DIRECTIONS.EAST]: [[1, 1 / 3], [1, 2 / 3]],
      [DIRECTIONS.SOUTH]: [[2 / 3, 1], [1 / 3, 1]],
      [DIRECTIONS.WEST]: [[0, 2 / 3], [0, 1 / 3]]
    };

    const group = selection.append("g");

    /**
     * Renders the tile's background.
     */
    const renderBackground = () => {
      group
        .append("rect")
        .attr("class", "background")
        .attr("x", x)
        .attr("y", y)
        .attr("width", size)
        .attr("height", size);
    };

    /**
     * Renders a path from a given starting point to a given
     * ending point.
     *
     * @param {number[]} start The starting point of the path
     * @param {number[]} end The ending point of the path
     * @param {string} color The color of the path
     */
    const renderPath = (start, end, color) => {
      /**
       * Gets the draw commands for an svg `path` from an array of
       * points. It draws a path using a basis curve.
       *
       * @param {number[][]} points an array of points to convert
       * to draw commands
       * @returns {string} the draw commands to pass to the `d`
       * attribute of a path
       */
      const getDrawCommands = this.d3
        .line()
        .x(([x]) => scaleX(x))
        .y(([, y]) => scaleY(y))
        .curve(this.d3.curveBasis);

      /**
       * Gets the mid points of a path. This is used to achieve
       * smoothly curved lines that blend into adjacent tiles.
       *
       * @returns {number[][]} an array of mid points
       */
      const getMidPoints = () => {
        let [midX1, midY1] = start;
        let [midX2, midY2] = end;

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

      const points = [start, ...getMidPoints(), end];

      group
        .append("path")
        .attr("class", "path")
        .attr("stroke", color)
        .attr("d", getDrawCommands(points));
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
      group
        .append("circle")
        .attr("class", "port")
        .attr("cx", scaleX(x))
        .attr("cy", scaleY(y))
        .attr("r", Math.min(size * 0.025, 8));
    };

    // Renders background
    renderBackground();

    // Renders paths
    this.paths.forEach(({ color, end, start }) => {
      const startPoint = PORT_POINTS[start[0]][start[1]];
      const endPoint = PORT_POINTS[end[0]][end[1]];
      renderPath(startPoint, endPoint, color);
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
   * @param {string} size the size of the image
   */
  renderToFile(fileName, size = 250) {
    const svg = this.d3Node.createSVG(size, size);

    const padding = size * 0.05;
    this.render(svg, padding, padding, size - 2 * padding);

    const RENDER_DIR = path.resolve(__dirname, "..", "1");
    const svgFile = fs.createWriteStream(
      path.resolve(RENDER_DIR, `${fileName}.svg`)
    );
    svgFile.write(this.d3Node.svgString());
    svgFile.end();
  }
}

module.exports = Tile;
