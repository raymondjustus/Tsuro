const Tile = require("../Common/tiles");
const { DIRECTIONS } = require("../Common/constants");

/**
 * Checks to see if the given tile is in the tile list
 * @param {Tile[]} tileList
 * @param {Tile Object} tile
 */
const tileRepetitionCheck = (tileList, tile) => {
  for (let i = 0; i < tileList.length; i++) {
    if (tile.checkRotationalEquality(tileList[i])) {
      return false;
    }
  }
  return true;
};

/**
 * Creates one version of each 35 possible tiles for the game Tsuro
 */
const allTiles = () => {
  let foundTiles = [];
  let zero = [DIRECTIONS.NORTH, 0];
  let one = [DIRECTIONS.NORTH, 1];
  let two = [DIRECTIONS.EAST, 0];
  let three = [DIRECTIONS.EAST, 1];
  let four = [DIRECTIONS.SOUTH, 0];
  let five = [DIRECTIONS.SOUTH, 1];
  let six = [DIRECTIONS.WEST, 0];
  let seven = [DIRECTIONS.WEST, 1];
  let portOptions = [one, two, three, four, five, six, seven];
  let count = 0;

  for (let i = 0; i < 7; i++) {
    // console.log("got here 1");
    let startFirst = zero;
    let endFirst = portOptions.splice(0, 1);
    for (let j = 0; j < 5; j++) {
      // console.log("got here 2");
      let startSecond = portOptions.shift();
      let endSecond = portOptions.shift();
      for (let k = 0; k < 3; k++) {
        // console.log("got here 3");
        let startThird = portOptions.shift();
        let endThird = portOptions.shift();
        let startFourth = portOptions.shift();
        let endFourth = portOptions.shift();
        // console.log("got here 4");
        let layout = [
          [startFirst, endFirst],
          [startSecond, endSecond],
          [startThird, endThird],
          [startFourth, endFourth]
        ];

        let temporary = new Tile();
        temporary.addPaths(layout);

        if (tileRepetitionCheck(foundTiles, temporary)) {
          foundTiles.push(temporary);
        }

        portOptions.push(startThird);
        portOptions.push(endThird);
        portOptions.push(startFourth);
        portOptions.push(endFourth);
      }
      portOptions.push(startSecond);
      portOptions.push(endSecond);
    }
    portOptions.push(endFirst);
  }

  console.log("LENGTH: " + foundTiles.length);

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
