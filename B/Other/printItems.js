/**
 * Prints the given items to stdout as stringified
 * JSON.
 *
 * @param {any[]} items the items to print
 */
const printItems = items => {
  const lastIdx = items.length - 1;

  items.forEach((item, i) => {
    console.log(JSON.stringify(item));
    if (i < lastIdx) {
      console.log('');
    }
  });
};

module.exports = printItems;
