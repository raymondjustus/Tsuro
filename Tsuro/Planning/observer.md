# Observer

```ts
interface Observer {
  id: string;
  name: string;
  isPlayer: boolean;
  state: BoardState;
  conn: Socket;

  /**
   * @constructor
   * Creates a new observer. Sets `boardState` to an empty board.
   *
   * @param {string} id the unique ID of the player
   * @param {string} name the player's name
   */
  constructor(id: Id, name: string): Observer;

  /**
   * Connects to a game via TCP using the information in the `gameConnection`
   *
   * @param {string} gameConnection the JSON options object for connection information
   *
   * @returns {boolean} whether the connection was successful 'isPlayer'
   */
  connectToGame(gameConnection: string): boolean;

  /**
   * Disconnects this observer from that socket connection
   */

  disconnect(): void;

  /**
   * Updates the boardstate of this observer. Has validation that an update command, only valid when via the `conn`
   *
   * @param {BoardState} state of the game when called
   */

  update(state: BoardState): void;

  /**
   * renders the current `state`
   */
  render(): void;

  /**
   * Is this object a player or not
   *
   * @returns {boolean} if this is a player
   */
  isPlayer(): boolean;
}
```
