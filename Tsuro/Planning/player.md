# Player

```ts
type Id = string;

interface Player {
  id: Id;
  name: string;
  hand: Tile[];
  currentAction: Action | null;

  /**
   * Creates an action using the given tile, rotational value, and
   * Coords. This will serve as the action that will be sent to
   * the referee in `sendAction`.
   *
   * @param {number} tileIndex the index of the desired tile in hand
   * @param {number} rotation the rotational value, from 0 to 3
   * @param {Coords} coords the coordinates to place the tile at
   */
  setAction(tileIndex: number, rotation: number, coords: Coords): void;

  /**
   * Sends the current action to the polling referes. Then clears the
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
}
```
