/**
 * Increments the given index by one, with the max value being the length
 * of the given array. Further increments will cycle back to 0.
 *
 * @param {number} index the current index to increase
 * @param {any[]} boundedArray the array whose length sets the upper bounds
 * of the index
 * @param {number} [value=1] the value to increment by, defaulted to 1
 * @returns {number} the incremented index
 */
const incrementIndex = (index, boundedArray, value = 1) => (index + value) % boundedArray.length;

module.exports = incrementIndex;
