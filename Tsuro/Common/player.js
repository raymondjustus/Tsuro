const { GAMESTATUS, DIRECTIONS, PORTS } = require('./utils/constants');
const { BoardState } = require('./boardState');
const { Coords } = require('./coords');
const { Position } = require('./position');

class Player {
  id = '';
  name = '';
  bs = null;
  hand = [];
  currentAction = null;
  gamestatus = null;

  /**
   * Creates a new Player, with an empty hand. Sets `gameStatus`
   * to `Waiting` and the `boardState` to an empty board.
   *
   * @param {string} id the unique ID of the player
   * @param {string} name the name of the player
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.hand = [];
    this.gamestatus = GAMESTATUS.WAITING;
    this.bs = new BoardState();
  }

  /**
   * Updates the player's personal board state, and gives them
   * the most recent view of the board.
   *
   * @param {BoardState} newBs the new BoardState given by the referee
   */
  updateState(boardState) {
    this.bs = boardState;
  }

  /**
   * Updates the game status to either be `Current Turn` if the referee
   * is waiting on the player for action, or `Waiting` if the player's
   * turn is now over.
   *
   * @param {boolean} isCurrentTurn
   */
  setTurnStatus(isCurrentTurn) {
    if (isCurrentTurn) {
      this.gamestatus = GAMESTATUS.CURRENT_TURN;
    } else {
      this.gamestatus = GAMESTATUS.WAITING;
    }
  }

  /**
   * Creates and sets the current action using the given tile,
   * rotational value, coords, and optionally position. This will
   * serve as the action that will be sent to the referee in
   * `sendAction`, or can be accessed via `getAction`.
   *
   * @param {int} handTileIndex the index of the desired tile in hand
   * @param {int} rotation the rotational value, from 0 to 3
   * @param {Coords} coords the coordinates to place the tile at
   * @param {Position} [position] the position to place an avatar on
   * (used for creating an InitialPlacement action)
   */
  setAction(handTileIndex, rotation, coords, position = null) {
    this.currentAction = {
      HandTileIndex: handTileIndex,
      rotation: rotation,
      coords: coords,
      position: position,
    };
  }

  // ---------------------------------------------------------------------
  //TODO: Implement this in some other way? Just wanted to get the code
  // down. Can easily pull this out to somewhere else.
  // Also. This is ***WRONG***.
  setDumbAction(isFirstPlacement) {
    if (isFirstPlacement) {
      //TODO: Check clockwise for valid placements of tile and avatar?
      this.setAction(this.hand[2], 0, new Coords(0, 0), new Position(DIRECTIONS.NORTH, PORTS.ZERO));
    } else {
      this.setAction(this.hand[0], 0, new Coords(0, 0));
    }
  }
  // ---------------------------------------------------------------------

  /**
   * Gets the currently set action for this player.
   *
   * @returns {Action} the currently set action
   */
  getAction() {
    return this.currentAction;
  }

  /**
   * Sends the current action to the polling referees. Then clears
   * the current action using the `_clearAction` method.
   */
  // TODO: Unsure of what to do here, exactly. Should this be
  // calling a method in the referee?
  sendAction() {
    // -----------------------
    // DO SOMETHING HERE TO SEND
    // -----------------------
    this._clearAction();
  }

  /**
   * @private
   * Clears the current action on this player.
   */
  _clearAction() {
    this.currentAction = null;
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
    this.gamestatus = GAMESTATUS.GAMEOVER;
    //TODO: Do something with winners here? Right now, logging them.
    console.log(winners.toString);
  }
}

module.exports = Player;
