export const addEffect = (stateItem, stateSetter, callback = false) => {
  return () => {
    const controller = window.listenToState((newStateValue) => {
      stateSetter(newStateValue);
      if (callback !== false) callback(newStateValue);
    }, stateItem);
    return () => controller.abort();
  };
};
