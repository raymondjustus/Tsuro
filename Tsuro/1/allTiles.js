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
 * Checks to see if the given tile is in the tile list, does not check for rotation equality
 * @param {Tile[]} tileList
 * @param {Tile Object} tile
 */
const simpleRepetitionCheck = (tileList, tile) => {
  for (let i = 0; i < tileList.length; i++) {
    if (tile.checkTileEquality(tileList[i])) {
      return false;
    }
  }
  return true;
};

// const smartFilter = tiles => {
//   let filteredList = [];
//   tiles.array.forEach(item => {
//     if (simpleRepetitionCheck(filteredList, item)) {
//       filteredList.push(item);
//     }
//   });

//   return filteredList;
// };

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

  let count = 0;

  for (let i = 0; i < 7; i++) {
    let portOptions = [one, two, three, four, five, six, seven];
    let startFirst = zero;
    // console.log("got here 1");
    console.log("removed " + startFirst);
    let endFirst = portOptions.splice(i, 1).shift();
    for (let j = 0; j < 5; j++) {
      // console.log("got here 2");
      let startSecond = portOptions.shift();
      let endSecond = portOptions.splice(j, 1).shift();
      for (let k = 0; k < 3; k++) {
        // console.log("got here 3");
        console.log("Len: " + portOptions.length);
        let startThird = portOptions.shift();
        let endThird = portOptions.splice(k, 1).shift();
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

        // if (tileRepetitionCheck(foundTiles, temporary)) {
        foundTiles.push(temporary);
        //   console.log("Found another: " + foundTiles.length);
        // }

        portOptions.unshift(endFourth);
        portOptions.unshift(startFourth);
        portOptions.unshift(endThird);
        portOptions.unshift(startThird);
      }
      portOptions.unshift(endSecond);
      portOptions.unshift(startSecond);
    }
    portOptions.unshift(endFirst);
    portOptions.unshift(startFirst);
    console.log("JUST CHECKING: " + JSON.stringify(portOptions));
  }

  let finalList = [];
  console.log(foundTiles.length);
  foundTiles.forEach(item => {
    if (simpleRepetitionCheck(finalList, item)) {
      finalList.push(item);
    }
  });
  console.log("LENGTH: " + finalList.length);
  let lastList = [];
  while (finalList.length > 0) {
    let item = finalList.pop();
    if (tileRepetitionCheck(lastList, item)) {
      lastList.push(item);
      console.log(lastList.length + " -- " + JSON.stringify(item.paths));
    }
    if (lastList.length >= 34) {
      console.log("Nearing end: " + finalList.length);
    }
  }

  let n = 0;
  lastList.forEach(tile => {
    let s = "tile-" + n;
    n += 1;
    tile.renderToFile(s);
  });
  console.log("LENGTH: " + lastList.length);
};

module.exports = allTiles;
