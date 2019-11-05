const { BoardState } = require('../Common');
const { GAME_STATUS } = require('./utils/constants');

class Player {
  /**
   * Creates a new Player, with an empty hand. Sets `gameStatus`
   * to `Waiting` and the `boardState` to an empty board.
   *
   * @param {string} id the unique ID of the player
   * @param {string} name the name of the player
   * @param {IStrategy} strategy an implementation of the strategy
   * interface to be used to make moves for the player
   */
  constructor(id, name, strategy) {
    this.id = id;
    this.name = name;
    this.strategy = strategy;
    this.hand = [];
    this.gameStatus = GAME_STATUS.WAITING;
    this.boardState = new BoardState();
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
   * Updates the game status to either be `Current Turn` if the referee
   * is waiting on the player for action, or `Waiting` if the player's
   * turn is now over.
   *
   * @param {boolean} isCurrentTurn
   */
  setTurnStatus(isCurrentTurn) {
    const gameStatus = isCurrentTurn ? GAME_STATUS.CURRENT_TURN : GAME_STATUS.WAITING;
    this.gameStatus = gameStatus;
  }

  /**
   * Gets the currently set action for this player.
   *
   * @returns {TilePlacement} the currently set action
   */
  getAction() {
    return this.strategy.determineAction(this.id, this.hand, this.boardState);
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
   * Removes all tiles from the current hand.
   */
  clearHand() {
    this.hand = [];
  }

  /**
   * Sets the `gameStatus` to `GameOver`. This signals to the player
   * that the game is now over, and which player(s) won.
   *
   * Kills Thanos.
   *
   * @param {string[]} winners the player ID(s) of the winner(s)
   * of the game
   */
  ñ(winners) {
    this.gameStatus = GAME_STATUS.GAME_OVER;
    //TODO: Do something with winners here? Right now, logging them.
    console.log(winners.toString);
  }
}

module.exports = Player;
