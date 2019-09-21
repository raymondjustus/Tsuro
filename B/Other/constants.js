exports.FLAG_INDEX = 2;

exports.FLAG_TYPES = {
  DOWN: '-down',
  UP: '-up',
};

exports.VALID_TYPES = {
  array: {
    key: 'array',
    delimiters: {
      start: '[',
      end: ']',
    },
  },
  object: {
    key: 'object',
    delimiters: {
      start: '{',
      end: '}',
    },
  },
  string: {
    key: 'string',
    delimiters: {
      start: '"',
      end: '"',
    },
  },
};
