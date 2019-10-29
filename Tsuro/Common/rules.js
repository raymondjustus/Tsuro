const { Board } = require('./board');
const { Player } = require('./player');
// const { TilePlacement } = require('./placement.js');
// const { InitialPlacement } = require('./placement.js');
// const { Coords, Position } = require('.positions');
const { BOARD_SIZE, DIRECTIONS } = require('./utils/constants');

class RuleChecker {
  constuctor() {
    console.log('DOES SOME SHIT');
    this._referee = {};
  }

  /**
   * Takes in the board state (boardState), the player who is sending the action (playerId), and the action itself (action)
   *
   * @param {BoardState} boardState is a representation of the board and the current state of the game
   * @param {TilePlacement} tilePlacement is what is about to be done (eg. tile placement)
   * @param {Player} player is the player intending on the action
   * @returns {boolean} whether the action is valid
   */
  canTakeAction(boardState, tilePlacement, player) {
    // Check if we can put the tile here
    if (this.checkPlacementLegality(boardState, tilePlacement, player)) {
      // Check the death cases of validity for this tile placement
      return this.checkPlacementValidity(boardState, tilePlacement, player);
    }
    return false;
  }

  /**
   *
   * @param {BoardState} boardState is a representation of the board and the current state of the game
   * @param {TilePlacement} tilePlacement is what is about to be done (eg. tile placement)
   * @param {Player} player is the player intending on the action
   * @returns {boolean}
   */
  checkPlacementLegality(boardState, tilePlacement, player) {
    const avatar = boardState.getAvatar(player.id);
    // Make sure we have our avatar, make sure the tile is empty, and make sure it is adjacent to the player.
    return (
      avatar &&
      !boardState.getTile(tilePlacement.coords) &&
      this._checkPlayerAdjacency(avatar, tilePlacement)
    );
  }
  /**
   * @param {BoardState} boardState is a representation of the board and the current state of the game
   * @param {TilePlacement} tilePlacement is what is about to be done (eg. tile placement)
   * @param {Player} player is the player intending on the action
   */
  checkPlacementValidity(boardState, tilePlacement, player) {
    // Copy the board to test tile placement results
    const bCopy = boardState.copy();
    bCopy.placeTile(tilePlacement.tile, tilePlacement.coords);
    const avatarCopy = bCopy.getAvatar(player.id);
    // If the move causes player death, check if any hand tiles can prevent the death.
    if (Board.isAvatarOnValidInitialPosition(avatarCopy.coords, avatarCopy.position)) {
      // If a non-death move is found, the given action is invalid.
      return this._totalFatality(player, boardState, tilePlacement);
    } else {
      return true;
    }
  }

  /**
   *
   * @param {Avatar} avatar
   * @param {TilePlacement} tilePlacement is what is about to be done (eg. tile placement)
   * @returns {boolean}
   * @private
   */
  _checkPlayerAdjacency(avatar, tilePlacement) {
    const newCoords = tilePlacement.coords.copy();
    try {
      newCoords.moveOne(avatar.position.direction);
      return avatar.coords.x === newCoords.x && avatar.coords.y === newCoords.y;
    } catch (e) {
      return false;
    }
  }

  /**
   *
   * @param {BoardState} board
   * @param {TilePlacement} tilePlacement
   * @param {Player} player
   * @returns {boolean} true if all cards lead to death
   */
  _totalFatality(boardState, tilePlacement, player) {
    // For each tile in hand, test for a tile that keeps the player alive
    for (let i = 0; i < player.hand.length; i++) {
      const tile = player.hand[i];
      // Test all four rotations
      for (let j = 0; j < 4; j++) {
        const bCopy = boardState.copy();
        const tCopy = tile.copy(j);
        bCopy.placeTile(tCopy, tilePlacement.coords);
        const avatarCopy = bCopy.getAvatar(player.id);
        // If the player ends up at the edge, they are dead. If any tile is not at the edge, they are alive return false
        if (!Board.isAvatarOnValidInitialPosition(avatarCopy.coords, avatarCopy.position)) {
          return false;
        }
      }
    }

    //QUESTION: will there be an async problem doing it this way?
    return true;
  }

  /**
   * Checks in with the server to see if the player can draw tiles.
   */
  canDraw(playerId) {
    console.log(playerId);
  }

  /**
   * Checks whether the given player (playerId) can place their avatar in the given position (position) at the tile (tile)
   * located at the given Coord (coord) at the start of the game.
   */
  canPlaceAvatar(playerId, coords, tile, position) {
    console.log(playerId, coords, tile, position);
  }
}

module.exports = RuleChecker;
