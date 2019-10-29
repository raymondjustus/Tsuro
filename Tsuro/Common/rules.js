// const { Board } = require('./board');
// const { Player } = require('./player');
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
   * @param {Board} boardState is a representation of the board and the current state of the game
   * @param {String} playerId is the player intending on the action
   * @param {Tileplacement} action is what is about to be done (eg. tile placement)
   * @returns {boolean} whether the action is valid
   */
  canTakeAction(boardState, playerId, action) {
    const state = boardState.getState();
    //rule #1 must be an empty space
    if (boardState.getTile(action.coords)) {
      return false;
    } else {
      //rule #2 placed tile must be adjacent to the player who placed it.
      const avatar = state.getAvatar(playerId);
      if (!avatar || !this._checkPlayerAdjacency(avatar, action)) {
        return false;
      } else {
        const playerHand = null; //this._referee.getPlayerHand(playerId)
        const bCopy = boardState.copy();
        bCopy.placeTile(action.tile, action.coords);
        if (this._checkAvatarDeath(avatar)) {
          return this._totalFatality(playerHand);
        } else {
          return true;
        }
      }
    }
  }

  _checkPlayerAdjacency(avatar, action) {
    if (avatar.position.direction === DIRECTIONS.NORTH) {
      return avatar.coords.x === action.coords.x && avatar.coords.y === action.coords.y + 1;
    } else if (avatar.position.direction === DIRECTIONS.EAST) {
      return avatar.coords.x === action.coords.x + 1 && avatar.coords.y === action.coords.y;
    } else if (avatar.position.direction === DIRECTIONS.WEST) {
      return avatar.coords.x === action.coords.x - 1 && avatar.coords.y === action.coords.y;
    } else if (avatar.position.direction === DIRECTIONS.SOUTH) {
      return avatar.coords.x === action.coords.x && avatar.coords.y === action.coords.y - 1;
    } else {
      console.log('Impossible tile placement');
      return false;
    }
  }

  _checkAvatarDeath(avatar) {
    const { x, y } = avatar.coords;
    const { direction } = avatar.position;

    let isValid = false;

    if (x === 0) {
      isValid = direction === DIRECTIONS.WEST;
    } else if (x === BOARD_SIZE - 1) {
      isValid = direction === DIRECTIONS.EAST;
    }
    if (y === 0) {
      isValid = isValid || direction === DIRECTIONS.NORTH;
    } else if (y === BOARD_SIZE - 1) {
      isValid = isValid || direction === DIRECTIONS.SOUTH;
    }
    return isValid;
  }

  /**
   *
   * @param {*} hand
   * @param {*} playerId
   * @param {*} board
   * @param {*} coords
   * @returns {boolean} true if all cards lead to death
   */
  _totalFatality(hand, playerId, board, coords) {
    hand.forEach(tile => {
      for (let i = 0; i < 4; i++) {
        const bCopy = board.copy();
        const tCopy = tile.copy(i);
        bCopy.placeTile(tCopy, coords);
        if (!this._checkAvatarDeath(bCopy.getAvatar(playerId))) {
          return false;
        }
      }
    });

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
