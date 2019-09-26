For this assignment, we use Python 3.7.4 to make a `labyrinth` module.

First, a `Token` class with a string field `color` set in its constructor.

This module will export a `Node` class which represents each node in the labyrinth.
A node will have the following fields:
- `name`: name of the node

This module will export a `Token` class which represents a token in the labyrinth.
A token will have the following fields:
- `name`: name of the token
- `color`: color of the token

The module will export a `Labyrinth` class which contains the nodes and the connections
between them. 
- `nodes`: mapping from node name to node object.
- `neighbors`: mapping from node name to list of node, which are the neighbors of each node.
- `tokens`: mapping from token name to node name

The `Labyrinth` class will contain a constructor for the plain labyrinth with a list of nodes,
which takes a list of node names and constructs nodes internally with those given names. 

The `Labyrinth` class will contain a method, `add_token(node_name, token)` which takes a string
and `Token` and adds the token to the labyrinth's node with the given name.

The `Labyrinth` class will contain a method, `token_can_reach(token, node_name)` which performs
Djikstra's algorithm to find the path from the token's node to the given node. It will begin by looking
up the node that the token is on in the map in the Labyrinth class, and then find the path from that node
to the node with the node_name passed in.

- Language is Python 3.7.4