const Tile = require("../Common/tiles");
const { DIRECTIONS } = require("../Common/constants");

/**
 * Creates one version of each 35 possible tiles for the game Tsuro
 */
const allTiles = () => {
  /*
    list of made tiles M

    for loop {
        pick the first pair
        for loop {
            pick the second pair
            for loop {
                pick the third pair
                whatever is left is the last
                
                tile T
                for loop over M {
                    check if t == m is true, 
                    if for all m in M t == m if false, add T to m
                }



            }
        }
    }






  */

  const t = new Tile();
  const a = new Tile();
  var paths = [
    [[DIRECTIONS.NORTH, 0], [DIRECTIONS.NORTH, 1]],
    [[DIRECTIONS.WEST, 1], [DIRECTIONS.SOUTH, 0]],
    [[DIRECTIONS.EAST, 0], [DIRECTIONS.SOUTH, 1]],
    [[DIRECTIONS.WEST, 0], [DIRECTIONS.EAST, 1]]
  ];

  var easyPath = [
    [[DIRECTIONS.NORTH, 0], [DIRECTIONS.NORTH, 1]],
    [[DIRECTIONS.WEST, 1], [DIRECTIONS.SOUTH, 1]],
    [[DIRECTIONS.EAST, 0], [DIRECTIONS.SOUTH, 0]],
    [[DIRECTIONS.WEST, 0], [DIRECTIONS.EAST, 1]]
  ];

  t.addPaths(easyPath);
  a.addPaths(paths);
  //   console.log(a.paths);
  //   a.rotate(1);
  //   console.log("EQUAL? " + t.tileEquality(a));
  //   t.renderToFile("tile-1");
  //   a.renderToFile("tile-2");

  let alt = a.newRotated(2);
  a.renderToFile("tile-1");
  alt.renderToFile("tile-2");
  console.log("RotEqal: " + a.checkRotationalEquality(t));
};

module.exports = allTiles;
