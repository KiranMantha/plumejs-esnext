const isObservable = (obj) => !!obj && typeof obj.subscribe === 'function';
const isPromise = (obj) => !!obj && typeof obj.then === 'function';

const ofObs = (input) => ({
  subscribe: (fn) => {
    fn(input);
  },
});

const fromPromiseObs = (input) => ({
  subscribe: (fn) => {
    Promise.resolve(input).then((value) => {
      fn(value);
    });
  },
});

class SubjectObs {
  asObservable() {
    return {
      subscribe: (fn) => this.subscribe(fn),
    };
  }

  subscribe(fn) {
    this.internalFn = fn;
    return this.unsubscribe;
  }

  unsubscribe() {
    this._internalFn = null;
  }

  next(value) {
    this.internalFn(value);
  }
}

const wrapIntoObservable = (value) => {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    return fromPromiseObs(Promise.resolve(value));
  }

  return ofObs(value);
};

export { wrapIntoObservable, SubjectObs };
