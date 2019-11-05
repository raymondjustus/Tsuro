// eslint-disable-next-line no-unused-vars
const Player = require('../Player/Player');
const { Board, RuleChecker } = require('../Common');
const { getTileFromLetters } = require('../Common/utils');
const { COLORS } = require('../Common/utils/constants');
const { tiles } = require('../Common/__tests__');

const COLOR_SET = [COLORS.WHITE, COLORS.BLACK, COLORS.RED, COLORS.GREEN, COLORS.BLUE];

class Referee {
  /**
   * Creates a new Referee with a new board and no players.
   */
  constructor() {
    this.board = new Board();
    this.currentPlayerIdx = -1;
    this.deckIdx = 0;
    this.currentTurn = 0;

    this.playerMap = {};
    this.currentPlayers = {};
    this.playerIds = [];

    this.removedPlayersForTurn = {};
  }

  /**
   * Adds a player to the current game, and sets their color.
   *
   * @param {Player} player the player to add to the game
   */
  addPlayer(player) {
    const playerIdx = this.playerIds.length;
    if (playerIdx >= COLOR_SET.length) {
      throw 'Max players already added.';
    }
    const { id } = player;
    this.playerMap[id] = player;
    this.currentPlayers[id] = player;
    this.playerIds.push(id);
    player.setColor(COLOR_SET[playerIdx]);
  }

  /**
   * Notifies all players of the other players' colors.
   */
  notifyPlayersOfColors() {
    const idToColorMap = this.playerIds.reduce((acc, id) => {
      const color = this.playerMap[id].getColor();
      return Object.assign(acc, {
        [id]: color,
      });
    }, {});
    this.playerIds.forEach(id => {
      this.playerMap[id].setPlayerColors(idToColorMap);
    });
  }

  /**
   * Checks whether the given player has an avatar currently on
   * the board.
   *
   * @param {Player} player the player to check for
   * @returns {boolean} whether the given player has an avatar
   * currently on the baord
   */
  _hasAvatar(player) {
    return !!this.board.getAvatar(player.id);
  }

  /**
   * Checks whether the given player can move, ala if they have
   * lost or not.
   *
   * @param {Player} player the player to check for
   * @returns {boolean} whether the given player has lost the
   * game
   */
  _canPlayerMove(player) {
    const avatar = this.board.getAvatar(player.id);
    return !avatar.hasLost();
  }

  /**
   * Gets a hand of the given size to give to the player.
   *
   * @param {number} size the preferred size of the hand
   * @returns {Tile[]} the hand of tiles
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
   * @param {Player} player the player to start-up
   * @param {number} handSize the size of the player's hand
   * @returns {BoardState} the current board state
   */
  _startPlayerTurn(player, handSize) {
    this.currentTurn += 1;
    const boardState = this.board.getState();
    player.updateState(boardState);
    player.setTurnStatus(true);
    player.receiveHand(this._getHand(handSize));
    return boardState;
  }

  /**
   * Checks if the given action is legal for the given player, that is it
   * can be placed on the board at all.
   *
   * @param {BoardState} boardState the current state of the board
   * @param {Player} player the player to check legality for
   * @param {Action} action the action to check legality for
   * @param {boolean} [isInitial=false] whether the given action is
   * initial or intermediate
   * @returns {boolean} whether the given action is legal for the
   * given player
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
   * Checks if the given action is valid for the given player, that is it
   * doesn't result in player suicide.
   *
   * @param {BoardState} boardState the current state of the board
   * @param {Player} player the player to check validity for
   * @param {Action} action the action to check validity for
   * @param {boolean} [isInitial=false] whether the given action is
   * initial or intermediate
   * @returns {boolean} whether the given action is valid for the
   * given player
   */
  _checkForActionValidity(boardState, player, action, isInitial = false) {
    if (isInitial) {
      return true;
    }
    return RuleChecker.checkPlacementValidity(boardState, action, player);
  }

  /**
   * Ends a player's turn by clearing their hand, setting their turn status
   * to waiting, and updating all players' board states.
   *
   * @param {Player} player the player to close out
   */
  _endPlayerTurn(player) {
    player.clearHand();
    player.setTurnStatus(false);
    const boardState = this.board.getState();
    this.playerIds.forEach(id => {
      this.playerMap[id].updateState(boardState);
    });
  }

  /**
   * Removes a player from the board and play.
   *
   * @param {Player} player the player to remove from play
   */
  _removePlayer(player) {
    const { id } = player;
    delete this.currentPlayers[id];
    this.removedPlayersForTurn[this.currentTurn] = [
      ...(this.removedPlayersForTurn[this.currentTurn] || []),
      id,
    ];
    this.board.removeAvatar(id);
  }

  /**
   * Places a tile on the board at the player's given discression. Also places the player's
   * avatar if the action is initial. Then ends player's turn.
   *
   * @param {Player} player the player to use the action for
   * @param {Action} action the action to use
   * @param {boolean} [isInitial=false] whether the action is initial or intermediate
   */
  _usePlayerAction(player, action, isInitial = false) {
    const { coords, position, tile } = action;
    if (isInitial) {
      try {
        this.board.placeInitialTileAvatar(player, tile, coords, position);
      } catch (err) {
        this._removePlayer(player);
      }
    } else {
      this.board.placeTile(tile, coords);
    }
    this._endPlayerTurn(player);
  }

  /**
   * Plays through an entire player's turn, from start to end. This will start
   * the player's turn, prompt them for action, and check for legality and
   * validity. If the action isn't legal or valid, the player will be removed
   * from play. Regardless, if the action is legal, the action will be played.
   *
   * @param {Player} player the player to prompt for action
   * @param {boolean} [isInitial=false] whether to prompt for an initial or
   * intermediate action
   */
  _promptPlayerForAction(player, isInitial = false) {
    const handSize = isInitial ? 3 : 2;
    const boardState = this._startPlayerTurn(player, handSize);
    const action = player.getAction(isInitial);
    const isLegal = this._checkForActionLegality(boardState, player, action, isInitial);
    const isValid = this._checkForActionValidity(boardState, player, action, isInitial);
    if (!isValid || !isLegal) {
      this._removePlayer(player);
    }
    if (isLegal) {
      this._usePlayerAction(player, action, isInitial);
    }
  }

  /**
   * Checks whether the game is over yet, that is if one or no players
   * are left on the board.
   *
   * @returns {boolean} whether the game is over yet
   */
  _isGameOver() {
    // console.log(Object.keys(this.currentPlayers).length);
    return Object.keys(this.currentPlayers).length <= 1;
  }

  /**
   * Gets the current winners of the game, that is those are still in play. If
   * none are left in play, it will check for the last turn in which players
   * have been removed and award those players.
   *
   * @returns {string[]} an array of player IDs
   */
  _getWinners() {
    const currentPlayers = Object.keys(this.currentPlayers);
    if (currentPlayers.length > 0) {
      return currentPlayers;
    }
    const lastTurn = Math.max(...Object.keys(this.removedPlayersForTurn));
    return this.removedPlayersForTurn[lastTurn];
  }

  /**
   * Notifies all players that the game is now over, and which players have
   * won the game.
   */
  _notifyPlayersOfGameOver() {
    const winners = this._getWinners();
    this.playerIds.forEach(id => {
      this.playerMap[id].endGame(winners);
    });
  }

  /**
   * Changes the current player, and prompts them for action. This function
   * will loop until the game is over, at which point all players will
   * be notified of game over and who won.
   */
  changePlayer() {
    if (this.playerIds.length === 0) {
      throw 'No players added to game yet';
    }

    while (!this._isGameOver()) {
      this.currentPlayerIdx = (this.currentPlayerIdx + 1) % this.playerIds.length;
      const id = this.playerIds[this.currentPlayerIdx];
      const player = this.currentPlayers[id];

      if (player) {
        if (!this._hasAvatar(player)) {
          this._promptPlayerForAction(player, true);
        } else if (this._canPlayerMove(player)) {
          this._promptPlayerForAction(player);
        } else {
          this._removePlayer(player);
        }
      }
    }

    this._notifyPlayersOfGameOver();
  }
}

module.exports = Referee;
