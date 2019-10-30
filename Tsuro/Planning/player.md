# Player

```ts
type Action = InitialPlacement | TilePlacement;
type Id = string;

enum GameStatus {
  Waiting,
  CurrentTurn,
  GameOver,
}

interface Player {
  id: Id;
  name: string;
  boardState: BoardState;
  hand: Tile[];
  currentAction: Action | null;
  gameStatus: GameStatus;

  /**
   * @constructor
   * Creates a new player. Sets `gameStatus` to `Waiting` and the
   * `boardState` to an empty board.
   *
   * @param {string} id the unique ID of the player
   * @param {string} name the player's name
   */
  constructor(id: Id, name: string): Player;

  /**
   * Updates the player's personal board state. This is how they're
   * able to see what the board currently looks like and make moves
   * accordingly.
   *
   * @param {BoardState} boardState the latest board state from the
   * referee
   */
  updateState(boardState: BoardState): void;

  /**
   * Updates the game status to either be `CurrentTurn` if the
   * referee is waiting on the player for action, or `Waiting` if
   * the player's turn is now over.
   *
   * @param {boolean} isCurrentTurn whether it's currently this
   * user's turn
   */
  setTurnStatus(isCurrentTurn: boolean): void;

  /**
   * Creates and sets the current action using the given tile,
   * rotational value, coords, and optionally position. This will
   * serve as the action that will be sent to the referee in
   * `sendAction`, or can be accessed via `getAction`.
   *
   * @param {number} handTileIndex the index of the desired tile in
   * hand
   * @param {number} rotation the rotational value, from 0 to 3
   * @param {Coords} coords the coordinates to place the tile at
   * @param {Position} [position] the position to place an avatar on
   * (used for creating an InitialPlacement action)
   */
  setAction(handTileIndex: number, rotation: number, coords: Coords, position?: Position): void;

  /**
   * Gets the currently set action for this player.
   *
   * @returns {Action} the currently set action
   */
  getAction(): Action;

  /**
   * Sends the current action to the polling referees. Then clears the
   * current action using the `_clearAction` method.
   */
  sendAction(): void;

  /**
   * @private
   * Clears the current action on this player.
   */
  _clearAction(): void;

  /**
   * Receives a hand given by the referee, and updates the current
   * player hand.
   */
  receiveHand(hand: Tile[]): void;

  /**
   * Removes all tiles from the current hand.
   */
  clearHand(): void;

  /**
   * Sets the `gameStatus` to `GameOver`. This signals to the player
   * that the game is now over, and which players won.
   *
   * @param {string[]} winners the player IDs of the winner(s) of the
   * game
   */
  endGame(winners: Id[]): void;
}
```
