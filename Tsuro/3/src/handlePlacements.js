const { Board, Coords, Player } = require('../../Common');
const {
  getEmptyBoardArray,
  getLetterFromPosition,
  getPositionFromLetter,
  getTileFromLetters,
} = require('../../Common/utils');
const { tiles } = require('../../Common/__tests__');

const isInitialPlacement = placement => typeof placement[0] === 'number';

const getResponses = placements => {
  const board = new Board();

  const jsonBoard = getEmptyBoardArray();

  const getAvatarResponse = color => {
    const {
      coords: { x, y },
      position,
    } = board.getAvatar(color);
    const port = getLetterFromPosition(position);
    const { tileIndex, rotation } = jsonBoard[x][y];
    return [color, tileIndex, rotation, port, x, y];
  };

  const responses = placements.map(placement => {
    if (isInitialPlacement(placement)) {
      const [tileIndex, rotation, color, port, x, y] = placement;
      const coords = new Coords(x, y);
      const tile = getTileFromLetters(tiles[tileIndex]).rotate(rotation / 90);
      const position = getPositionFromLetter(port);

      const player = new Player(color, color);

      board.placeTile(tile, coords);
      jsonBoard[x][y] = { tileIndex, rotation };
      board.placeAvatar(player, color, coords, position);
      return getAvatarResponse(color);
    } else {
      const [color, tileIndex, rotation, x, y] = placement;
      const coords = new Coords(x, y);
      const tile = getTileFromLetters(tiles[tileIndex]).rotate(rotation / 90);

      if (!board.getAvatar(color)) {
        return [color, ' never played'];
      } else {
        board.placeTile(tile, coords);
        jsonBoard[x][y] = { tileIndex, rotation };
        return getAvatarResponse(color);
      }
    }
  });

  return responses;
};

const handlePlacements = placements => {
  const responses = getResponses(placements);
  console.log(JSON.stringify(responses));
};

module.exports = handlePlacements;
