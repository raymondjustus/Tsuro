const { FLAG_TYPES } = require('./constants');

/**
 * Gets the value of a given item.
 *
 * @param {string|any[]|object} item the item to fetch
 * the value for
 * @returns {string} the value of the item
 */
const getItemValue = item => {
  if (item) {
    if (typeof item === 'string') {
      return item;
    } else if (Array.isArray(item)) {
      return item[0];
    } else if (typeof item === 'object') {
      return item.this;
    }
  }
  throw 'Invalid item type.';
};

/**
 * Creates a compare function for sorting an item array,
 * based on the given order type.
 *
 * @param {boolean} isAscending whether the list should be
 * sorted in ascending order
 * @returns {function} the compare function for the sort
 */
const compareItems = isAscending => (a, b) => {
  const aValue = getItemValue(a);
  const bValue = getItemValue(b);

  const sortFactor = isAscending ? 1 : -1;

  return aValue.localeCompare(bValue) * sortFactor;
};

/**
 * Sorts the given items based on the passed flag. Sorts
 * items in ascending order with the `-up` flag, in
 * descending order with the `-down` flag, or no sorting
 * without a flag.
 *
 * @param {any[]} items the array of items to sort
 * @param {string} flag the passed flag
 */
const sortItems = (items, flag) => {
  if (!flag) {
    return items;
  }
  const isAscending = flag === FLAG_TYPES.UP;
  return items.sort(compareItems(isAscending));
};

module.exports = sortItems;
