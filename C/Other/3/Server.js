/**
 * This is a MOCK implementation meant for the most basic of testing against the client protocol for task 3.
 */
class Server {
  addNode(id) {
    console.log(`Added ${id}`);
  }

  addEdge(id1, id2) {
    console.log(`Added edge from ${id1} to ${id2}`);
  }

  addToken(color, id) {
    console.log(`Added ${color} to ${id}`);
  }

  removeNode(id) {
    console.log(`Removed ${id}`);
  }

  removeEdge(id1, id2) {
    console.log(`Removed edge from ${id1} to ${id2}`);
  }

  removeToken(color) {
    console.log(`Removed ${color}`);
  }

  getNode(id) {
    console.log(`Got ${id}`);
    return "";
  }

  getEdge(id1, id2) {
    console.log(`Got edge from ${id1} to ${id2}`);
    return {};
  }

  getToken(color) {
    console.log(`Got ${color}`);
    return "";
  }

  getLabyrinth() {
    console.log(`Got Labyrinth`);
    return {};
  }

  isTherePathFromTokenToNode(tokenColor, nodeId) {
    console.log(`Checking path from ${tokenColor} to ${nodeId}`);
    return true;
  }
}

module.exports = Server;
