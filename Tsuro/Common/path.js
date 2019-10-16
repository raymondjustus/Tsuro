// Represents a path on a tile
/*
      {
        start: pathways[0][0],
        end: pathways[0][1],
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
 */

class Path {
  constructor(start, end) {
    this.start = start; // Position
    this.end = end; // Position
    this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}

module.exports = Path;
