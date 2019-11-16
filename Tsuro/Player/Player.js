const { BoardState } = require('../Common');
const { GAME_STATUS } = require('../Common/utils/constants');

class Player {
  /**
   * Creates a new Player, with an empty hand. Sets `gameStatus`
   * to `Waiting` and the `boardState` to an empty board.
   *
   * @param {string} id the unique ID of the player
   * @param {string} name the name of the player
   * @param {Strategy} strategy a strategy implementation to be used
   * to make moves for the player
   */
  constructor(id, name, strategy) {
    this.id = id;
    this.name = name;
    this.strategy = strategy;

    this.colors = {};
    this.hand = [];
    this.gameStatus = GAME_STATUS.WAITING;
    this.boardState = new BoardState();
    this._shouldPrintResults = true;
  }

  /**
   * Updates the game status to either be `Current Turn` if the referee
   * is waiting on the player for action, or `Waiting` if the player's
   * turn is now over.
   *
   * @param {boolean} isCurrentTurn whether it's currently the player's turn
   */
  setTurnStatus(isCurrentTurn) {
    const gameStatus = isCurrentTurn ? GAME_STATUS.CURRENT_TURN : GAME_STATUS.WAITING;
    this.gameStatus = gameStatus;
  }

  /**
   * Updates the player's personal board state, and gives them
   * the most recent view of the board.
   *
   * @param {BoardState} boardState the new BoardState given by the referee
   */
  updateState(boardState) {
    this.boardState = boardState;
  }

  /**
   * Sets this player's color to the referee-assigned color.
   *
   * @param {string} color this player's avatar's color
   */
  setColor(color) {
    this.colors[this.id] = color;
  }

  /**
   * Gets the player's avatar's color.
   *
   * @returns {string} the player's avatar's color
   */
  getColor() {
    return this.colors[this.id];
  }

  /**
   * Adds a map of player IDs to colors, so this player knows which player
   * is which color in the game.
   *
   * @param {{ [id: string]: string }} colorMap a map of player's ID to their
   * associated avatar color
   */
  setPlayerColors(colorMap) {
    this.colors = Object.assign(this.colors, colorMap);
  }

  /**
   * Receives a hand given by the referee, and updated the current
   * player hand.
   *
   * @param {Tile[]} hand the new array (hand) of tiles
   */
  receiveHand(hand) {
    this.hand = hand;
  }

  /**
   * Gets either a player's initial or intermediate action, as determined
   * by the strategy.
   *
   * @param {boolean} [isInitial=false] whether the action to retrieve
   * should be the player's initial action
   */
  getAction(isInitial = false) {
    if (isInitial) {
      return this.getInitialAction();
    }
    return this.getIntermediateAction();
  }

  /**
   * Gets the initial action of this player, as determined by the strategy,
   *
   * @returns {InitialAction} the player's initial action
   */
  getInitialAction() {
    return this.strategy.getInitialAction(this.id, this.hand, this.boardState);
  }

  /**
   * Gets the next intermediate action for the player, as determined by the strategy.
   *
   * @returns {IntermediateAction} the player's next action
   */
  getIntermediateAction() {
    return this.strategy.getIntermediateAction(this.id, this.hand, this.boardState);
  }

  /**
   * Removes all tiles from the current hand.
   */
  clearHand() {
    this.hand = [];
  }

  /**
   * Sets whether this player will print out who won their game at the end.
   * @param {Boolean} flag if the player should print
   */
  setPlayerPrintResultsStatus(flag) {
    this._shouldPrintResults = flag;
  }

  /**
   * Sets the `gameStatus` to `GameOver`. This signals to the player
   * that the game is now over, and which player(s) won.
   *
   * @param {string[]} winners the player ID(s) of the winner(s)
   * of the game
   */
  endGame(winners) {
    this.gameStatus = GAME_STATUS.GAME_OVER;
    if (this._shouldPrintResults) {
      console.log(winners);
    }
  }
}

module.exports = Player;
