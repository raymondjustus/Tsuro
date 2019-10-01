import sys
from check_type import check_type
from Node import Node
from Token import Token

class Labyrinth:
  nodes = {}
  neighbors = {}
  tokens = {}

  def __init__(self, nodes):
    check_type(nodes, list, 'Given nodes must be a list')

    for node_name in nodes:
      if not isinstance(node_name, str):
        raise TypeError('Nodes list must only contain strings')
      self.nodes[node_name] = Node(node_name)
      # NOTE: ACTION NOT OUTLINED IN SPECIFICATION
      self.neighbors[node_name] = []

  '''
  Adds given token to the Labyrinth's node with
  the given name.
  '''
  def add_token(self, node_name, token):
    check_type(node_name, str, 'Given node must be a string')
    check_type(token, Token, 'Given token must be a Token')

    if token.name in self.tokens:
      raise RuntimeError('Token already attached to node')
    elif not node_name in self.nodes:
      raise RuntimeError('Node does not exist in Labyrinth')
    else:
      self.tokens[token.name] = node_name

  '''
  NOTE: SPECIFICATION CALLED FOR DJIKSTRA'S, BUT CANNOT
  PERFORM ALGORITHM ON NON-WEIGHTED GRAPH

  Performs DFS to find the path from the Token's node to
  the Node with the given name.
  '''
  def token_can_reach(self, token, node_name):
    check_type(token, Token, 'Given token must be a Token')
    check_type(node_name, str, 'Given node must be a string')

    if not token.name in self.tokens:
      raise RuntimeError('Token must be attached to a node')
    elif not node_name in self.nodes:
      raise RuntimeError('Node does not exist in Labyrinth')
    attached_node_name = self.tokens[token.name]
    return self.__can_node_reach_target(attached_node_name, node_name, set())

  '''
  Checks whether the given node can reach the given
  target node.
  '''
  def __can_node_reach_target(self, node_name, target_node_name, visited_nodes):
    if not node_name in visited_nodes:
      if node_name == target_node_name:
        return True
      visited_nodes.add(node_name)
      neighbors = self.neighbors[node_name]
      if len(neighbors) > 0:
        for node in neighbors:
          does_node_reach = self.__can_node_reach_target(node.name, target_node_name, visited_nodes)
          if does_node_reach:
            return True
    return False

  '''
  NOTE: METHOD NOT OUTLINED IN SPECIFICATION
  
  Adds an edge between two given nodes.
  '''
  def add_edge(self, node_name_1, node_name_2):
    check_type(node_name_1, str, 'Given node must be a string')
    check_type(node_name_2, str, 'Given node must be a string')

    if not node_name_1 in self.nodes or not node_name_2 in self.nodes:
      raise RuntimeError('Gives nodes do not exist in Labyrinth')
    
    for node in self.neighbors[node_name_1]:
      if node.name == node_name_2:
        raise RuntimeError('Edge already exists between given nodes')

    node_1 = self.nodes[node_name_1]
    node_2 = self.nodes[node_name_2]

    self.neighbors[node_name_1].append(node_2)
    self.neighbors[node_name_2].append(node_1)