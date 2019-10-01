'''
Checks if the given value is of the given type,
otherwise raises a `TypeError` with the given
message.
'''
def check_type(value, type, message):
  if not isinstance(value, type):
    raise TypeError(message)