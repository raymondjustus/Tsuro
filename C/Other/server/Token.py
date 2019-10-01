from check_type import check_type

class Token:
  color = ''
  # `name` is not utilized, but outlined in specification
  name = ''

  def __init__(self, color):
    check_type(color, str, 'Color must be a string')
    self.color = color
    # NOTE: ACTION NOT OUTLINED IN SPECIFICATION
    # assuming `name` also has to be color, as per `add_token` spec
    self.name = color