class Ref {
  /**
   * Initializes a new ref. Sets the ref type based on initial
   * value.
   *
   * @param {any} [value=''] the initial value for a ref
   */
  constructor(value = "") {
    this.value = value;
  }

  /**
   * Sets the value of the ref to the given value.
   *
   * Can accept a function that dynamically sets the value. This
   * function will be passed a single argument equal to the current
   * value of the ref.
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
    if (typeof value === "function") {
      this.value = value(this.value);
    } else {
      this.value = value;
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
