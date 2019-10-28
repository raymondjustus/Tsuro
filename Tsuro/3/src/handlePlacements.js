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
  const jsonBoard = getEmptyBoardArray();

  const usePlacements = () => {
    const placeTile = (tileIndex, rotation, x, y) => {
      const coords = new Coords(x, y);
      const tile = getTileFromLetters(tiles[tileIndex]).rotate(rotation / 90);

      board.placeTile(tile, coords);
      jsonBoard[x][y] = { tileIndex, rotation };
    };

    const handleInitialPlacement = ([tileIndex, rotation, color, port, x, y]) => {
      placeTile(tileIndex, rotation, x, y);

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

  usePlacements();
  const responses = getResponses();
  console.log(JSON.stringify(responses));
};

module.exports = handlePlacements;
