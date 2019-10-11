# Plan

## Part 1

### Automated Players

Automated players need core pieces for reading input from a game, a decision making process, and the ability to send it back as a move.

- _Interpeting the game:_ The automated player needs a component to interpret a game response and evaluate a board state with all player pieces on it. The component should also expect the response to have the auto player’s own hand, as well as information on the deck and discard piles to base their decision on.

- _Decision making:_ Another component will use the received game board info and evaluate possible options. It will prioritize a move that keeps them in the game, and then secondarily determines which moves will be most strategic in achieving victory.

- _Submitting answers:_ Finally, a component will take that decision and construct a message for the game that informs them what their tile placement will be and/or how it will be rotated.

### Game Software

The game software should be able to handle connecting players, initializing game board state, directing the flow of the game via rounds, receiving instructions from players, validating said instructions, updating game board state accordingly, eliminating players from the game, and deciding the winner(s) upon end of game.

- _Connecting players:_ The game software should be able to handle allowing connections from players.

- _Initializing game board state:_ The initial game board state should include an empty board, a deck of 35 unique cards shuffled, and dealing 3 cards to each player. Each player will choose a starting position.

- _Directing game flow:_ The game should start by deciding who is the first connected player. In the order from oldest to youngest connection, players will place a tile on the board and the game will handle moving pieces accordingly.

- _Receiving/validating instructions:_ The game should be able to receive instructions sent via the player connection. These instructions will be how a user places a tile and/or rotates one. The game should be able to validate whether a user's instruction is correct or not, and alert the user if there is an error with their move.

- _Eliminating/awarding players:_ The game should be eliminate players from the game when the game updates their piece to reach another port. The game will award a player if they are the last one left after an elimination, or all remaining players are eliminated at the same time.

## Part 2

The first thing we should do is a create a base TCP server implementation.

On the server implementation, we will create basic game state. This will include a board and player token pieces (necessary for creating a game).

We will then create a client implementation that can connect to the TCP server and send JSON messages. We will test out the connection by sending a token placement command to the server.

After that has passed, we will implement the tiles and tile placement on the server. This will include validation for what is possible to place. After that, we will allow for sending tile commands from the client to the server.

Once that is complete, we will then fully implement the game on the server, including flow, losing, and winning state. This also implies that we will be allowing for multiple players at this state.
