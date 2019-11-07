# Observer

The role of the Observer is to be able to watch a game that is currently in progress.
Player will extend this class so that players can watch the game they are participating in.

```ts
type Id = string;
type Ip = string;

interface ConnectionOptions {
  ip: Ip;
  port: number;
}

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
   * `ConnectionOptions`. This might include IP, port, login credentials,
   * or any other connection specifications.
   *
   * @param {ConnectionOptions} connectionOptions the JSON options object for connection information
   *
   * @returns {boolean} whether the connection was successful
   */
  connectToGame(connectionOptions: JSON): boolean;

  /**
   * Disconnects this observer from that socket connection
   */
  disconnect(): void;

  /**
   * Updates the boardstate of this observer. Will validate
   * that it only mutates when given a board state from the server
   * (via the 'conn')
   *
   * @param {BoardState} state the current state of the baord
   */
  update(state: BoardState): void;

  /**
   * Is this object a player or not. It will default to false and
   * be overridden in the Player.
   *
   * @returns {boolean} if this is a player
   */
  isPlayer(): boolean;

  /**
   * Uses D3 to render the current state of the board and whose turn it is, which can then be shown in a window.
   *
   * @param {BoardState} state the current state of the baord
   */
  render(state: BoardState): void;
}
```
