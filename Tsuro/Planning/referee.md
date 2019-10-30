# Referee

```ts
type Index = number;

interface Referee {
  board: Board;
  players: Record<Index, Player>;
  currentPlayerIndex: Index;

  /**
   * Adds a player to the current game.
   *
   * @throws if a player already exists with given ID or name
   * @throws if the game has already begun
   *
   * @param {Player} player the player to add
   */
  addPlayer(player: Player): void;

  /**
   * Changes the game turn to the next player.
   *
   * This will:
   * - update current player index (changing turn)
   * - check if the player can move
   *   - if so:
   *     - update player turn status to true
   *     - deal tiles to the player
   *     - poll for player action
   *     - call appropriate validation and place methods
   *     - clear player hand
   *     - update player turn status to false
   *     - update all players' state
   * - check if game is over
   *   - if so, notify players of end
   *   - if not, recurse
   */
  changePlayer(): void;

  /**
   * @private
   * Checks whether or not the current player can move. This calls the
   * `RuleChecker` to check if the player's respective avatar has not
   * exited the board yet.
   *
   * @param {number} index the index of the player in the `players`
   * array
   * @returns {boolean} whether the player can move
   */
  _canPlayerMove(index: Index): boolean;

  /**
   * Updates the status of the player at the given index to whether
   * it's currently their turn or not. This uses the `setTurnStatus`
   * method.
   *
   * @param {number} playerIndex the index of the player in the
   * `players` array
   * @param {boolean} isCurrentTurn whether it is currently the
   * player's turn
   */
  _updatePlayerStatus(playerIndex: Index, isCurrentTurn: boolean): void;

  /**
   * @private
   * Deals the player at the given index two randomly-generated tiles.
   *
   * @param {number} index the index of the player in the `players`
   * array
   */
  _dealPlayer(index: Index): void;

  /**
   * @private
   * Polls the player at the given index for an action.
   *
   * @param {number} index the index of the player in the `players`
   * array
   * @returns {Action} the player's action
   */
  _pollPlayerForAction(index: Index): Action;

  /**
   * @private
   * Validates if the given tile exists in the player hand.
   *
   * @param {Tile[]} currentHand the hand of tiles to check
   * against to validate the tile exists within it
   * @param {Tile} tile the tile to validate
   * @returns {boolean} whether the given tile exists in the
   * player's hand
   */
  _validateTile(currentHand: Tile[], tile: Tile): boolean;

  /**
   * @private
   * Validates if the given action is valid for the given player.
   * This uses the `RuleChecker` to check for move validity.
   *
   * @param {number} playerIndex the index of the player in the
   * `players` array
   * @param {Action} action the player's chosen action
   * @returns {boolean} whether the given action is valid for the
   * given player
   */
  _validateAction(playerIndex: Index, action: Action): boolean;

  /**
   * @private
   * Enacts the given action for the avatar of the given player
   * on the board.
   *
   * @param {number} playerIndex the index of the player in the
   * `players` array
   * @param {Action} action the player's chosen action
   */
  _useAction(playerIndex: Index, action: Action): void;

  /**
   * @private
   * Removes all tiles from the hand of the player at the given
   * index.
   *
   * @param {number} index the index of the player in the `players`
   * array
   */
  _clearPlayerHand(index: Index): void;

  /**
   * @private
   * Gives all players the most up-to-date version of the board
   * state. This lets them see what moves have just been played.
   */
  _updatePlayersState(): void;

  /**
   * @private
   * Notifies all players that the game has ended, and which
   * player(s) have won.
   */
  _notifyPlayersOfGameOver(): void;
}
```
