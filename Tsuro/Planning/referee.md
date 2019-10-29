# Referee

```ts
interface Referee {
  board: Board;
  players: Player[];
  currentPlayerIndex: number;

  /**
   * Updates the index of the current player, changing whose turn it
   * currently is.
   *
   * This will:
   * - check if the player can move
   *   - if so, deal tiles to the player
   *   - poll for player action
   *   - call appropriate validation and place methods
   *   - clear player hand
   * - recurse until all (or all but one) player can't move
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
  _canPlayerMove(index: number): boolean;

  /**
   * @private
   * Deals the player at the given index two randomly-generated tiles.
   *
   * @param {number} index the index of the player in the `players`
   * array
   */
  _dealPlayer(index: number): void;

  /**
   * @private
   * Polls the player at the given index for an action.
   *
   * @param {number} index the index of the player in the `players`
   * array
   * @returns {Action} the player's action
   */
  _pollPlayerForAction(index: number): Action;

  /**
   * @private
   * Validates if the given tile exists in the player hand.
   *
   * @param {number} playerIndex the index of the player in the
   * `players` array
   * @param {Tile} tile the tile to validate
   * @returns {boolean} whether the given tile exists in the
   * player's hand
   */
  _validateTile(playerIndex: number, tile: Tile): boolean;

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
  _validateAction(playerIndex: number, action: Action): boolean;

  /**
   * @private
   * Enacts the given action for the avatar of the given player
   * on the board.
   *
   * @param {number} playerIndex the index of the player in the
   * `players` array
   * @param {Action} action the player's chosen action
   */
  _useAction(playerIndex: number, action: Action): void;

  /**
   * @private
   * Removes all tiles from the hand of the player with the given
   * index.
   *
   * @param {number} index the index of the player in the `players`
   * array
   */
  _clearPlayerHand(index: number): void;
}
```
