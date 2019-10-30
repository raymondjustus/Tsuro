const Board = require('./board');

class RuleChecker {
  /**
   * Takes in the board state (boardState), the player who is sending the action (playerId), and the action itself (action)
   *
   * @param {BoardState} boardState is a representation of the board and the current state of the game
   * @param {TilePlacement} tilePlacement is what is about to be done (eg. tile placement)
   * @param {Player} player is the player intending on the action
   * @returns {boolean} whether the action is valid
   */
  static canTakeAction(boardState, tilePlacement, player) {
    // Check if we can put the tile here
    if (this.checkPlacementLegality(boardState, tilePlacement, player)) {
      // Check the death cases of validity for this tile placement
      return this.checkPlacementValidity(boardState, tilePlacement, player);
    }
    return false;
  }

  /**
   * Returns whether the tilePlacement is a legal dropping zone for on the given board for the given player
   * @param {BoardState} boardState is a representation of the board and the current state of the game
   * @param {TilePlacement} tilePlacement is what is about to be done (eg. tile placement)
   * @param {Player} player is the player intending on the action
   * @returns {boolean} whether the tile placement is legal for that player
   */
  static checkPlacementLegality(boardState, tilePlacement, player) {
    const avatar = boardState.getAvatar(player.id);
    // Make sure we have our avatar, make sure the tile is empty, and make sure it is adjacent to the player.
    return (
      avatar &&
      !boardState.getTile(tilePlacement.coords) &&
      this._checkPlayerAdjacency(avatar, tilePlacement)
    );
  }

  /**
   * Returns whether the tilePlacement is a valid move where it does not result in the given player's suicide on the
   * given board.
   * @param {BoardState} boardState is a representation of the board and the current state of the game
   * @param {TilePlacement} tilePlacement is what is about to be done (eg. tile placement)
   * @param {Player} player is the player intending on the action
   */
  static checkPlacementValidity(boardState, tilePlacement, player) {
    // Copy the board to test tile placement results
    const boardCopy = new Board([], boardState);
    boardCopy.placeTile(tilePlacement.tile, tilePlacement.coords);
    const avatarCopy = boardCopy.getAvatar(player.id);
    // If the move causes player death, check if any hand tiles can prevent the death.
    if (Board.isAvatarOnOutsidePosition(avatarCopy.coords, avatarCopy.position)) {
      // If a non-death move is found, the given action is invalid.
      return this._doesPlayerHaveValidMove(player, boardState, tilePlacement.coords);
    }
    return true;
  }

  /**
   * Returns whether the the given tilePlacement is adjacent to the given avatar
   * @param {Avatar} avatar The avatar on the board
   * @param {TilePlacement} tilePlacement is what is about to be done (eg. tile placement)
   * @returns {boolean} whether an avatar is adjacent to the tile placement
   * @private
   */
  static _checkPlayerAdjacency(avatar, tilePlacement) {
    const { coords, position } = avatar;
    try {
      const newCoords = tilePlacement.coords.copy().moveOne(position.direction);
      return coords.isEqualTo(newCoords);
    } catch (e) {
      return false;
    }
  }

  /**
   * Returns whether all tiles in the given player's hand result in death.
   * @param {BoardState} boardState is a representation of the board and the current state of the game
   * @param {Coordinates} coors is where the tile will be placed
   * @param {Player} player is the player intending on the action
   * @returns {boolean} true if all cards lead to death, false if any one tile keeps the player alive
   */
  static _doesPlayerHaveValidMove(boardState, coords, player) {
    const { hand, id } = player;
    // For each tile in hand, test for a tile that keeps the player alive
    for (let i = 0; i < hand.length; i++) {
      const tile = hand[i];
      // Test all four rotations
      for (let j = 0; j < 4; j++) {
        const boardCopy = boardState.copy();
        const tCopy = tile.copy(j);
        boardCopy.placeTile(tCopy, coords);
        const avatarCopy = boardCopy.getAvatar(id);
        // If the player ends up at the edge, they are dead. If any tile is not at the edge, they are alive return false
        if (!Board.isAvatarOnOutsidePosition(avatarCopy.coords, avatarCopy.position)) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Checks whether the given player (playerId) can place their avatar in the given position (position) at the tile (tile)
   * located at the given Coord (coord) at the start of the game.
   * @param {BoardState} boardState
   * @param {String} playerId
   * @param {Coordinates} coords
   * @param {Tile} tile
   * @param {Position} position
   * @returns {Boolean} whether the player can place their avatar at that initial position at the start of the game
   */
  static canPlaceAvatar(boardState, playerId, coords, tile, position) {
    return (
      Board.isAvatarOnOutsidePosition(coords, position) && // On the edge of the board
      !boardState.getAvatar(playerId) && // The avatar has not been placed
      !boardState.getTile(coords) && // This tile space is empty
      !boardState.hasNeighboringTiles(coords) && // There are no neighbors
      tile.getEndingPosition(position).direction !== position.direction
    ); // There is no loop back to the same side
  }
}
module.exports = RuleChecker;
