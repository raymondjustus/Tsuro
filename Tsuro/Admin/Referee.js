// eslint-disable-next-line no-unused-vars
const Player = require('../Player/Player');
const { Board, RuleChecker } = require('../Common');
const { getTileFromLetters } = require('../Common/utils');
const { COLORS } = require('../Common/utils/constants');
const { tiles } = require('../Common/__tests__');

const COLOR_SET = [COLORS.WHITE, COLORS.BLACK, COLORS.RED, COLORS.GREEN, COLORS.BLUE];

class Referee {
  constructor() {
    this.board = new Board();
    this.players = [];
    this.currentPlayerIdx = -1;
    this.deckIdx = 0;
  }

  /**
   * Adds a player to the current game.
   *
   * @param {Player} player
   */
  addPlayer(player) {
    const playerIdx = this.players.length;
    if (playerIdx >= COLOR_SET.length) {
      throw 'Max players already added.';
    }
    this.players.push(player);
    player.setColor(COLOR_SET[playerIdx]);
  }

  /**
   * Notifies all players of the other players' colors.
   */
  notifyPlayersOfColors() {
    const idToColorMap = this.players.reduce((acc, player) => {
      const color = player.getColor();
      return Object.assign(acc, {
        [player.id]: color,
      });
    }, {});
    this.players.forEach(player => {
      player.setPlayerColors(idToColorMap);
    });
  }

  /**
   * Checks whether the given player has an avatar currently on
   * the board.
   *
   * @param {Player} player
   * @returns {boolean}
   */
  _hasAvatar(player) {
    return !!this.board.getAvatar(player.id);
  }

  /**
   * Checks whether the given player can move.
   *
   * @param {Player} player
   * @returns {boolean}
   */
  _canPlayerMove(player) {
    const avatar = this.board.getAvatar(player.id);
    return !avatar.hasLost();
  }

  /**
   * Gets a hand of the given size to give to the player.
   *
   * @param {number} size
   * @returns {Tile[]}
   */
  _getHand(size) {
    const hand = [];
    for (let i = 0; i < size; i++) {
      const tile = getTileFromLetters(tiles[this.deckIdx]);
      hand.push(tile);
      this.deckIdx = (this.deckIdx + 1) % tiles.length;
    }
    return hand;
  }

  /**
   * Starts a player's turn by updating their board state, setting their
   * turn status to current, and giving them their hand.
   *
   * @param {Player} player
   * @param {number} handSize
   * @returns {BoardState} the current board state
   */
  _startPlayerTurn(player, handSize) {
    const boardState = this.board.getState();
    player.updateState(boardState);
    player.setTurnStatus(true);
    player.receiveHand(this._getHand(handSize));
    return boardState;
  }

  /**
   * Checks if the given action is valid for the given player.
   *
   * @param {BoardState} boardState
   * @param {Player} player
   * @param {Action} action
   * @param {boolean} [isInitial=false]
   * @returns {boolean}
   */
  _checkForActionLegality(boardState, player, action, isInitial = false) {
    const isLegal = RuleChecker.checkPlacementLegality(boardState, action, player);
    if (isInitial) {
      return (
        isLegal ||
        RuleChecker.canPlaceAvatar(
          boardState,
          player.id,
          action.coords,
          action.tile,
          action.position
        )
      );
    }
    return isLegal;
  }

  /**
   * Ends a player's turn by clearing their hand, setting their turn status
   * to waiting, and updating all players' board states.
   *
   * @param {Player} player
   */
  _endPlayerTurn(player) {
    player.clearHand();
    player.setTurnStatus(false);
    const boardState = this.board.getState();
    this.players.forEach(player => {
      player.updateState(boardState);
    });
  }

  /**
   * Places a tile on the board at the player's given discression. Also places the player's
   * avatar if the action is initial. Then ends player's turn.
   *
   * @param {Player} player
   * @param {Action} action
   * @param {boolean} [isInitial=false]
   */
  _usePlayerAction(player, action, isInitial = false) {
    const { coords, position, tile } = action;
    this.board.placeTile(tile, coords, isInitial);
    if (isInitial) {
      this.board.placeAvatar(player, player.getColor(), coords, position);
    }
    this._endPlayerTurn(player);
  }

  /**
   * Removes a player from play
   *
   * @param {number} playerIdx
   */
  _removePlayer(playerIdx) {
    // TODO: implement remove logic
    console.log('remove', playerIdx);
  }

  /**
   * Plays through an entire player's turn, from start to end. This will start
   * the player's turn, prompt them for action, and check for legality. If the
   * action is legal, the action will be used; otherwise, the player is removed
   * from play.
   *
   * @param {Player} player
   * @param {boolean} [isInitial=false]
   */
  _promptPlayerForAction(player, isInitial = false) {
    const handSize = isInitial ? 3 : 2;
    const boardState = this._startPlayerTurn(player, handSize);
    const action = player.getAction(isInitial);
    const isLegal = this._checkForActionLegality(boardState, player, action, isInitial);
    if (isLegal) {
      this._usePlayerAction(player, action, isInitial);
    } else {
      this._removePlayer(this.currentPlayerIdx);
    }
  }

  /**
   * Checks whether the game is over yet.
   *
   * @returns {boolean}
   */
  _isGameOver() {
    // TODO: add logic for checking for game over
    return false;
  }

  /**
   * Gets the current winners of the game, that is those are still in play.
   *
   * @returns {string[]} an array of player IDs
   */
  _getWinners() {
    // TODO: implement winner logic
    return [];
  }

  /**
   * Notifies all players that the game is now over, and which players have
   * won the game.
   *
   * @param {string[]} winners
   */
  _notifyPlayersOfGameOver(winners) {
    this.players.forEach(player => {
      player.endGame(winners);
    });
  }

  /**
   * Changes the current player, and prompts them for action. This function
   * will recurse until the game is over, at which point all players will
   * be notified of game over.
   */
  changePlayer() {
    this.currentPlayerIdx += 1;
    const player = this.players[this.currentPlayerIdx];

    if (!this._hasAvatar(player)) {
      this._promptPlayerForAction(player, true);
    } else if (this._canPlayerMove(player)) {
      this._promptPlayerForAction(player);
    }

    if (this._isGameOver()) {
      const winners = this._getWinners();
      this._notifyPlayersOfGameOver(winners);
    } else {
      this.changePlayer();
    }
  }
}

module.exports = Referee;
