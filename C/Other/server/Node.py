from check_type import check_type

class Node:
  name = ''

  def __init__(self, name):
    check_type(name, str, 'Name must be a string')
    self.name = name