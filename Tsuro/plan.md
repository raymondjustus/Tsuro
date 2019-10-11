# Plan

## Part 1

### Automated Players

Automated player need core pieces for reading input from a local game or server game, a decision making process, and sending it back as a move.

- _Interpeting the game:_ The automated player needs a component to interpret a game response and evaluate a board state with all player pieces on it. The component should also expect the response to have the auto player’s own hand, as well as information on the deck and discard piles to base their decision on.

- _Decision making:_ Another component will use the received game board info and evaluate possible options. It will prioritize a move that keeps them in the game, and then secondarily determines which moves will be most strategic in achieving victory.

- _Submitting answers:_ Finally, a component will take that decision and construct a message for the local or server game that informs them what their tile placement will be and/or how it will be rotated.

### Game Software

The game software should be able to handle connecting players, initializing game board state, directing the flow of the game via rounds, receiving instructions from players, validating said instructions, updating game board state accordingly, eliminating players from the game, and deciding the winner(s) upon end of game.

- _Connecting players:_ The game software should be able to handle allowing connections from players.

- _Initializing game board state:_ The initial game board state should include an empty board, a deck of 35 unique cards shuffled, and dealing 3 cards to each player. Each player will choose a starting position.

- _Directing game flow:_ The game should start by deciding who is the oldest player. In the order from oldest to youngest, players will place a tile on the board and the game will handle moving pieces accordingly.

- _Receiving/validating instructions:_ The game should be able to receive instructions sent via the player connection. These instructions will be how a user places a tile and/or rotates one. The game should be able to validate whether a user's instruction is correct or not, and alert the user if there is an error with their move.

- _Eliminating/awarding players:_ The game should be eliminate players from the game when the game updates their piece to reach another port. The game will award a player if they are the last one left after an elimination, or all remaining players are eliminated at the same time.

## Part 2

The game board software should exist on a TCP server. Players can be connected to the server via sockets. Players will write JSON messages via the socket to the TCP server, in which the server will interpret the messages and update the game accordingly. Vice versa, the server can write messages to the socket to inform the player of the current game state, as well as any errors from the player's instructions.
