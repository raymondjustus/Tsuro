class Ref {
  /**
   * Initializes a new ref. Sets the ref type based on initial
   * value.
   *
   * @param {any} [value=''] the initial value for a ref
   */
  constructor(value = '') {
    this.value = value;
    this.type = typeof value;
  }

  /**
   * Sets the value of the ref to the given value. New value
   * must have the same type as the ref.
   *
   * If the ref is not of type `function`, can accept a function
   * that dynamically sets the value. This function will be passed
   * a single argument equal to the current value of the ref.
   *
   * Example:
   * ```js
   * const ref = new Ref(1);
   * ref.set(2);
   * ref.set(val => val + 1);
   * ```
   *
   * @param {any} value the new value to set, or a setter function
   * that accepts the current value
   */
  set(value) {
    const valueType = typeof value;
    const hasSameType = this.type === valueType;

    if (valueType === 'function' && !hasSameType) {
      this.value = value(this.value);
    } else if (hasSameType) {
      this.value = value;
    } else {
      throw 'New value does not have same type as ref.';
    }
  }

  /**
   * Gets the current value of the ref.
   *
   * @returns {any} the current value of the ref
   */
  get() {
    return this.value;
  }
}

module.exports = Ref;
