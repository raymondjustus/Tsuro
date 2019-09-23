# Assignment 2 - Task 1

## Labyrinth
A maze like structure represented by a [Graph](##Graph) of simple [Nodes](##Node)
  - Graph
Labyrinth(g)
  This creates the Labyrinth with the specified simple graph *g* and returns the Labyrinth, or *null* if the graph given could not be used to create a labyrinth. 

addToken(t, n)
  This applies the given Token *t* to the Node *n*. If n is not in the graph, this will return a -1, else it will return the updated node.

isTherePathFromColorToName(t, n)
  This checks to see if there is a valid path from *t* to *n* where *t* is a colored token, and *n* is a named node in the graph. This function returns a boolean, *true* if there is a path or *false* if there is not.


## Graph
A graph is a connectivity of linked [nodes](##Node). This graph's nodes are connected by at most one (1) [Edge](##Edge). 
  - Array of Nodes
  - Array of Edges
  
Graph()
  This creates a Graph. Graphs have nodes, and edges connecting them. It will return the graph or *null* if this is not a valid graph.
  You may pass optionally pass in as arguments:
    - An array of Nodes
    - An array of Edges
    Passing either or both of these in will construct and return (if valid) a graph with these componenets.

addNode(n)
  This adds the node *n* to the graph. If a node already exists with the same name as *n* this will return *fasle*, otherwise it will return *true*.
  
addEdge(e)
  This adds the edge *e* to the graph. It will return *true* only if for edge *e*, and nodes *n1* and *n2*:
    - *n1* != *n2*
    - *n1* and *n2* are in the graph
    - there is not already an edge between *n1* and *n2*
    - the edge e does not create a cycle

## Node
A node in a graph can have a name and a series of tokens.
- Name
- Array of Tokens

Node(n)
  This creates a node with the name n. This constructor returns the node that has been created.
  This constructor has an optional argument of an array of Tokens *t*.

addToken(t)
  This method adds a token *t* to this token's array of tokens. It returns *false* only if this token is already in the list and returns *true* otherwise.

## Edge
An edge in a graph is a connection of two nodes.
  - Node node1
  - Node node2 
Edge(n1, n2)
  This creates an edge between the nodes *n1* and *n2*. It returns the edge or *null* if the nodes are not valid.

## Token
A token is a marker that is a color tag on a node.
  - *IDK WHAT TO PUT HERE??*
