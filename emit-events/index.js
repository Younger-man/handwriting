class EventEmitter {
  constructor() {
    this._events = {};
  }
  on(name, fn) {
    if (typeof fn !== 'function') {
      throw new Error('must be function');
    }
    if (this._events[name]) {
      this._events[name].push(fn);
    } else {
      this._events[name] = [fn];
    }
  }
  emit(name, ...args) {
    if (!this._events[name]) return;
    this._events[name].forEach((fn) => {
      fn(...args);
    });
    return true;
  }
  off(name, fn) {
    if (!this._events[name]) return;
    const index = this._events[name].findIndex((item) => item === fn);
    if (index > -1) {
      this._events[name].splice(index, 1);
    }
  }
}

export default EventEmitter;
