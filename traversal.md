# Assignment 2 - Task 1

## Labyrinth

Implementation Language: Javascript running on Node 6.17.1

`Labyrinth` is a connectivity of nodes connected to each other by edges. Each Node in the Labyrinth will have a unique id which can be defined by the user.
Nodes can also have a token that the user assigns with a unique color. No two tokens in the labyrinth can share this color. The user should be able to create a new Labyrinth, add / remove nodes, add / remove edges, and determine whether there is a path from a given token to a given node.

initLabyrinth()
  This creates an empty Labyrinth.
  
addNode(id: string)
  This adds a node with the given *id* to the Labyrinth. Throws an error if a node with the given id already exists.

addEdge(id1: string, id2: string)
  This adds a edge between two nodes with the given ids *id1* and *id2*. Throws an error if a edge connecting the given nodes already exists or either node does not exist already.

removeNode(id: string)
  This removes a node with the given *id* from the Labyrinth. Any tokens assigned to this node and any edges connected to this node will be removed as well. Throws an error if a node with the given id is not found. 

removeEdge(id1: string, id2: string)
  This removed a edge between two nodes with the given ids *id1* and *id2*. Throws an error if a node with either id is not found. 

addToken(color: string, id: string)
  This appends a token of color *color* to a node with the given *id*. Throws an error if a node with the given id is not found.

getNodeInfo(id: string)
  This returns information for the given node. The message lists all edges connected to this node and with their source node

isTherePathFromColorToName(color: string, id: string)
  This confirms if there is a valid path from a token of color *color* to a node with the given id *id*. This function returns a boolean, *true* if there is a path or *false* if there is not.  Throws an error if a token with the given color or if a node with the given id is not found.
