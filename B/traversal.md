# Assignment 2 - Task 1

**Implementation Language:** JavaScript, on Node 6.17.1

## Labyrinth

`Labyrinth` is a graph of Nodes connected to each other by Edges.

```js
new Labyrinth(): Labyrinth
```

This creates an empty Labyrinth.

```js
addNode(id: string): void
```

Adds a Node with the given `id` to the Labyrinth. Throws an error if a Node with the given `id` already exists.

```js
addEdge(id1: string, id2: string): void
```

Adds an Edge between two Nodes with the given ids `id1` and `id2`, respectively. Throws an error if an Edge connecting the given Nodes already exists, or either Node does not exist already.

```js
addToken(color: string, nodeId: string): void
```

Appends a Token of the given `color` to a Node with the given `nodeId`. Throws an error if a Node with the given `nodeId` is not found, or if the given `color` is not unique.

```js
removeNode(id: string): void
```

Removes a Node with the given `id` from the Labyrinth. Any Tokens assigned to this Node and any Edges connected to this Node will be removed as well. Throws an error if a Node with the given `id` is not found.

```js
removeEdge(id1: string, id2: string): void
```

Removes an Edge between two Nodes with the given ids `id1` and `id2`. Throws an error if either id does not belong to an existing Node, or an Edge does not exist between the Nodes with the given ids.

```js
removeToken(tokenColor: string): void
```

Removes a token of specified `tokenColor`. Throws an error if a Token with the given color does not exist.

```js
getNode(id: string): Node
```

Returns a copy of the given `Node` with the given `id`. Throws an error if a Node with the given `id` doesn't exist.

```js
getEdge(id1: string, id2: string): Edge
```

Returns a copy of the given `Edge` between two Nodes with the given ids `id1` and `id2`, respectively. Throws an error if an Edge connecting the given Nodes does not exist, or either Node does not exist already.

```js
getToken(color: string): Token
```

Returns a copy of a `Token` of the given `color`. Throws an error if a Token with the given color does not exist.

```js
getLabyrinth(): Labyrinth
```

Returns a copy of the `Labyrinth`.

```js
isTherePathFromTokenToNode(tokenColor: string, nodeId: string): boolean
```

Confirms if there is a valid path from a Token of color `tokenColor` to a Node with the given id `nodeId`. Returns a `true` if there exists a path, or `false` otherwise. Throws an error if a Token with the given color or if a Node with the given id does not exist.

## Object Interfaces

Below are some interfaces we defined with basic fields for each used object.

```ts
interface Token {
  color: string;
  node: Node;
}

interface Node {
  id: string;
  tokens: Token[];
  edges: Edge[];
}

interface Edge {
  node1: Node;
  node2: Node;
}
```
