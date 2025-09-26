const globalSubscribers = new Set();

export function subscribe(callback) {
  globalSubscribers.add(callback);
}

export function unsubscribe(callback) {
  globalSubscribers.delete(callback);
}

function notify() {
  globalSubscribers.forEach(callback => callback());
}

export function useState(initialValue) {
  let state = initialValue;

  const setState = (updater) => {
    const newState = typeof updater === 'function' ? updater(state) : updater;
    if (Object.is(state, newState)) return;
    state = newState;
    notify();
  };

  const getState = () => state;
  return [getState, setState];
}