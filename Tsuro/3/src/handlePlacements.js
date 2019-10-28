const { Board, Coords, Player } = require('../../Common');
const {
  getEmptyBoardArray,
  getLetterFromPosition,
  getPositionFromLetter,
  getTileFromLetters,
} = require('../../Common/utils');
const { tiles } = require('../../Common/__tests__');

const isInitialPlacement = placement => typeof placement[0] === 'number';

const handlePlacements = placements => {
  const board = new Board();

  // for keeping track of tile index and rotation (only pertinent to testing suite)
  const jsonBoard = getEmptyBoardArray();

  const usePlacements = placements => {
    const placeTile = (tileIndex, rotation, x, y, skipUpdate = false) => {
      const coords = new Coords(x, y);
      const tile = getTileFromLetters(tiles[tileIndex]).rotate(rotation / 90);

      board.placeTile(tile, coords, skipUpdate);
      jsonBoard[x][y] = { tileIndex, rotation };
    };

    const handleInitialPlacement = ([tileIndex, rotation, color, port, x, y]) => {
      placeTile(tileIndex, rotation, x, y, true);

      const player = new Player(color, color);
      const coords = new Coords(x, y);
      const position = getPositionFromLetter(port);
      board.placeAvatar(player, color, coords, position);
    };

    const handleIntermediatePlacement = ([color, tileIndex, rotation, x, y]) => {
      if (board.getAvatar(color)) {
        placeTile(tileIndex, rotation, x, y);
      }
    };

    placements.forEach(placement => {
      if (isInitialPlacement(placement)) {
        handleInitialPlacement(placement);
      } else {
        handleIntermediatePlacement(placement);
      }
    });
  };

  const getResponses = () => {
    const colors = ['white', 'black', 'red', 'green', 'blue'];

    return colors.map(color => {
      const avatar = board.getAvatar(color);
      if (!avatar) {
        return [color, ' never played'];
      } else if (avatar.hasCollided()) {
        return [color, ' collided'];
      } else if (avatar.hasExited()) {
        return [color, ' exited'];
      }

      const {
        coords: { x, y },
        position,
      } = avatar;
      const port = getLetterFromPosition(position);

      const { tileIndex, rotation } = jsonBoard[x][y];
      return [color, tileIndex, rotation, port, x, y];
    });
  };

  usePlacements(placements);
  const responses = getResponses();
  console.log(JSON.stringify(responses));
};

module.exports = handlePlacements;
