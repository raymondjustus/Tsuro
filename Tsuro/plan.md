# Plan

##Part 1
An automated player need core pieces for reading input from a local game or server game, a decision making process, and sending it back as a move.

The auto player needs a component to interpret a game response and evaluate a board state with all player pieces on it. The component should also expect the response to have the auto player’s own hand, information on the deck pile and discard pile to base their decision on.

Another component will use the received info and evaluate possible options for a move that keeps them in the game and then determine the best one.

Finally a component will take that decisio and construct a message for the local game or server game that tells the game what their tile placement will be and how it will be rotated.
