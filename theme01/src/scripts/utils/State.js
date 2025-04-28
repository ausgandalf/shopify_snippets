if (typeof window.state === 'undefined') {
  window.state = {};
}

/*
 * Updates a window state object and trigger a window event for it
 *
 * @param {String} stateItem: the name of the state object to change
 * @param {any} newValue: the new value of the state object
 * @param {boolean} allowRetrigger: determines whether to trigger the state change event if the new value is the same as the old value - defaults to false
 */
if (typeof window.setState === 'undefined') {
  window.setState = (stateItem, newValue, allowRetrigger = false) => {
    // ignore setting state if trying to set it to what it already is
    // to avoid re-triggering events
    if (window.state[stateItem] === newValue && !allowRetrigger) return;
    // set new state and dispatch state update event
    window.state[stateItem] = newValue;
    const ev = new Event(`${stateItem}StateChange`);
    document.dispatchEvent(ev);
  };
}

/*
 * Creates a listener for a window state change and sets a react components state using a set hook
 *
 * @param {React Hook/Function} setter: callback function for the setting the state item
 * @param {String} stateItem: the item in state to listen for
 *
 * @return {AbortController}: the abort controller to cancel the listen event
 */
if (typeof window.listenToState === 'undefined') {
  window.listenToState = (setter, stateItem) => {
    const controller = new AbortController();
    document.addEventListener(
      `${stateItem}StateChange`,
      () => setter(window.state[stateItem]),
      { signal: controller.signal }
    );
    return controller;
  };
}