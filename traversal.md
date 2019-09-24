# Assignment 2 - Task 1

## Labyrinth

**Implementation Language:** JavaScript, on Node 6.17.1

`Labyrinth` is a graph of Nodes connected to each other by Edges. Each Node in the Labyrinth will have a unique `id` which can be defined by the user.
Nodes can also have a Token that the user assigns with a unique color. No two Tokens in the Labyrinth can share the same color. The user should be able to create a new Labyrinth; add, remove, and retrieve Nodes, Edges, and Tokens; and determine whether there is a path from a given Token to a given Node.

initLabyrinth()
  This creates an empty Labyrinth.
  
addNode(id: string)
  Adds a Node with the given `id` to the Labyrinth. Throws an error if a Node with the given `id` already exists.

addEdge(id1: string, id2: string)
  Adds an Edge between two Nodes with the given ids `id1` and `id2`, respectively. Throws an error if an Edge connecting the given Nodes already exists, or either Node does not exist already.

removeNode(id: string)
  Removes a Node with the given `id` from the Labyrinth. Any Tokens assigned to this Node and any Edges connected to this Node will be removed as well. Throws an error if a Node with the given `id` is not found. 

removeEdge(id1: string, id2: string)
  Removes an Edge between two Nodes with the given ids `id1` and `id2`. Throws an error if either id does not belong to an existing Node.

addToken(color: string, nodeId: string)
  Appends a Token of the given `color` to a Node with the given `nodeId`, and returns a copy of that Token. Throws an error if a Node with the given `nodeId` is not found, or if the given `color` is not unique.

getNode(id: string)
  Returns a copy of the given Node, including all Edges connected to this Node and any Tokens on this Node.

isTherePathFromTokenToNode(tokenColor: string, nodeId: string)
Confirms if there is a valid path from a Token of color `tokenColor` to a Node with the given id `nodeId`. Returns a `true` if there exists a path, or `false` otherwise.  Throws an error if a Token with the given color or if a Node with the given id does not exist.
