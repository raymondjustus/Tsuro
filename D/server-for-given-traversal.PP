class Node {
  constructor(id, tokens, edges) {
    this.id = id;
    this.tokens = tokens;
    this.edges = edges;
  }
}

class Edge {
  constructor(node1, node2) {
    this.node1 = node1;
    this.node2 = node2;
  }
}

class Token {
  constructor(color, node) {
    this.color = color;
    this.node = node;
  }
}

class Labyrinth {
  constructor() {
    this.nodes = [];
    this.edges = [];
    this.tokens = [];
  }

  // adds a Node with the given id to the Labyrinth.
  // throws an error if a Node with the given id already exists.
  addNode(id) {
    if (this.nodes.some(node => node.id === id)) {
      throw "Node with given id already exists";
    } else {
      this.nodes.push(new Node(id, [], []));
    }
  }

  // adds an Edge between two Nodes with the given ids id1 and id2, respectively.
  // throws an error if an Edge connecting the given Nodes already exists,
  // or either Node does not exist already.
  addEdge(id1, id2) {
    const node1 = this.getNode(id1);
    const node2 = this.getNode(id2);
    if (node1.edges.some(edge => edge.node1 === node2 || edge.node2 === node2)) {
      throw "Edge connecting the two nodes already exists";
    } else {
      const edge = new Edge(node1, node2);
      this.edges.push(edge);
      node1.edges.push(edge);
      node2.edges.push(edge);
    }
  }

  // appends a Token of the given color to a Node with the given nodeId.
  // throws an error if a Node with the given nodeId is not found,
  // or if the given color is not unique.
  addToken(color, nodeId) {
    const node = this.getNode(nodeId);
    if (this.tokens.some(token => token.color === color)) {
      throw "The given color is not unique";
    } else {
      const token = new Token(color, node);
      this.tokens.push(token);
      node.tokens.push(token);
    }
  }

  // removes a Node with the given id from the Labyrinth.
  // any Tokens assigned to this Node and any Edges connected to this Node will
  // be removed as well.
  // throws an error if a Node with the given id is not found.
  removeNode(id) {
    const node = this.getNode(id);

    node.edges.slice().forEach(edge => this.removeEdge(edge.node1.id, edge.node2.id));
    node.tokens.slice().forEach(token => this.removeToken(token.color));

    const index = this.nodes.indexOf(node);
    this.nodes.splice(index, 1);
  }

  // removes an Edge between two Nodes with the given ids id1 and id2
  // throws an error if either id does not belong to an existing Node,
  // or an Edge does not exist between the Nodes with the given ids.
  removeEdge(id1, id2) {
    const edge = this.getEdge(id1, id2);

    const index = this.edges.indexOf(edge);
    this.edges.splice(index, 1);

    const indexNode1 = edge.node1.edges.indexOf(edge);
    edge.node1.edges.splice(index, 1);
    const indexNode2 = edge.node2.edges.indexOf(edge);
    edge.node2.edges.splice(index, 1);
  }

  // removes a token of specified tokenColor
  // throws an error if a Token with the given color does not exist.
  removeToken(tokenColor) {
    const token = this.getToken(tokenColor);

    const index = this.tokens.indexOf(token);
    this.tokens.splice(index, 1);

    const indexNode = token.node.tokens.indexOf(token);
    token.node.tokens.splice(index, 1);
  }

  // returns a copy of the given Node with the given id.
  // throws an error if a Node with the given id doesn't exist.
  getNode(id) {
    const node = this.nodes.find(node => node.id === id);
    if (node === undefined) {
      throw "Node with the given id does not exist";
    } else {
      return node;
    }
  }

  // returns a copy of the given Edge between two Nodes with the given ids
  // id1 and id2, respectively.
  // throws an error if an Edge connecting the given Nodes does not exist,
  // or either Node does not exist already.
  getEdge(id1, id2) {
    const node1 = this.getNode(id1);
    const node2 = this.getNode(id2);
    const edge = node1.edges.find(edge => edge.node1 === node2 || edge.node2 === node2);
    if (edge === undefined) {
      throw "Edge connecting the given nodes does not exist";
    } else {
      return edge;
    }
  }

  // returns a copy of a Token of the given color.
  // throws an error if a Token with the given color does not exist.
  getToken(color) {
    const token = this.tokens.find(token => token.color === color);
    if (token === undefined) {
      throw "Token with the given color does not exist";
    } else {
      return token;
    }
  }

  // Returns a copy of the Labyrinth.
  getLabyrinth() {
    return this;
  }

  // confirms if there is a valid path from a Token of color tokenColor to
  // a Node with the given id nodeId.
  // returns a true if there exists a path, or false otherwise.
  // throws an error if a Token with the given color
  // or if a Node with the given id does not exist.
  isTherePathFromTokenToNode(tokenColor, nodeId) {
    const from = this.getToken(tokenColor).node;
    const to = this.getNode(nodeId);

    let visitedNodes = [];
    let outerNodes = [from];

    while (outerNodes.length > 0) {
      if (outerNodes.includes(to)) {
        return true;
      }
      visitedNodes = [...visitedNodes, ...outerNodes];
      outerNodes = [];
      visitedNodes.forEach(node => {
        node.edges.forEach(edge => {
          const connectedNode = edge.node1 === node ? edge.node2 : edge.node1;
          if (!visitedNodes.includes(connectedNode) && !outerNodes.includes(connectedNode)) {
            outerNodes.push(connectedNode);
          }
        });
      });
    }

    return false;
  }
}

module.exports = {
  Node : Node,
  Edge: Edge,
  Token, Token,
  Labyrinth : Labyrinth
}

