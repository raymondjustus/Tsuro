# Observer

Player will extend this class as player functionality adds on to observer functionality.

```ts
type Id = string;

interface Observer {
  id: Id;
  name: string;
  isPlayer: boolean;
  state: BoardState;
  conn: Socket;

  /**
   * @constructor
   * Creates a new observer. Sets `boardState` to an empty board.
   *
   * @param {Id} id the unique ID of the player
   * @param {string} name the player's name
   */
  constructor(id: id, name: string): Observer;

  /**
   * Connects to a game via TCP using the information in the
   *  `gameConnection`. This might include IP, port, login credentials,
   *  or any other connection specifications.
   *
   * @param {JSON} gameConnection the JSON options
   *                   object for connection information
   *
   * @returns {boolean} whether the connection was successful
   */
  connectToGame(gameConnection: string): boolean;

  /**
   * Disconnects this observer from that socket connection
   */

  disconnect(): void;

  /**
   * Updates the boardstate of this observer. Will validate
   *  that it only mutates when given a board state from the server
   *   (via the 'conn')
   *
   * @param {BoardState} state the current state of the baord
   */

  update(state: BoardState): void;

  /**
   * renders the current `state` on the client
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
