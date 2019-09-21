const { FLAG_INDEX, FLAG_TYPES } = require('./constants');

/**
 * Gets the flag from the initial command arguments. A flag is
 * required and an error will be thrown if one is not provided.
 *
 * Only accepts `-up` or `-down` as valid flags.
 *
 * @param {string[]} [args=[]] the arguments provided to run
 * the command
 * @returns {string} the flag passed in the arguments
 */
const getFlag = (args = []) => {
  const hasFlag = args.length > FLAG_INDEX;
  if (!hasFlag) {
    throw `You must include an argument ${FLAG_TYPES.UP} or ${FLAG_TYPES.DOWN} flag.`;
  }

  const flag = args[FLAG_INDEX];
  if (flag !== FLAG_TYPES.DOWN && flag !== FLAG_TYPES.UP) {
    throw `Your provided flag must be either ${FLAG_TYPES.UP} or ${FLAG_TYPES.DOWN}.`;
  }

  return flag;
};

module.exports = getFlag;
