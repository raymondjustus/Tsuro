

class Token:
  name = None
  color = None

  def __init__(self, color):
    self.color = color
    
    return
import sys

class Node:
  name = None

  def init(name):
    self.name = name

class Labrynth:
  nodes = None
  neighbors = None
  tokens = None

  def __init__(nodes):
    self.nodes = {}
    self.neighbors = {}
    self.tokens = {}
    for node_name in nodes:
      self.nodes[node_name] = new Node(node_name)

  # adds the given token to the labrynth's
  # node with the given name
  def add_token(node_name, token):
    if token not in tokens:
      if node_name in self.nodes.keys():
        tokens[token.name] = node_name

  # this was a class that i needed to implement
  # that was not part of the spec
  def add_edge(node1, node2):
    if node1.name not in neighbors.keys():
      neighbors[node1.name] = [node2.name]
    else:
      neighbors[node1.name].append(node2.name)

  # a helper for implementing dijkstras
  def minDistance(self, dist, spt):

    min = sys.maxint

  # the big man, the legend, the algorithm himself. Mr. Dijkstra
  def dijkstra(self, src):
    #gogogogogogogo
      


  

