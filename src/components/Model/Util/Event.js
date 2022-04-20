export class Event {
  constructor() {
    this.onEvent = [];
  }

  connect(fn) {
    this.onEvent.push(fn);
    return fn;
  }

  disconnect(fn) {
    this.onEvent = this.onEvent.filter((el) => el !== fn);
  }

  dispatch() {
    this.onEvent.forEach((fn) => {
      fn();
    });
  }
}
