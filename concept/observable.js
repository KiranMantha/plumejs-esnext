// function Observable(data) {
//   this.subscribe = function (...observer) {
//     const [next, error, complete] = observer;
//     observerD = { next, error, complete };

//     try {
//       data.forEach((item) => {
//         //simulated an error with the type
//         if (typeof item === 'string') {
//           throw {};
//         }
//         observerD.next(item);
//       });
//       observerD.complete();
//     } catch (e) {
//       observerD.error('is a string');
//     }
//   };

//   return { subscribe: this.subscribe };
// }

const isFunction = (value) => typeof value === 'function';
const isObject = (value) => value !== null && typeof value === 'object';

class Observable {
  constructor(_data) {
    this.data = _data;
  }
  subscribe(observer) {
    const { next, error, complete } = observer;
    if (isObject(observer)) {
    }
  }
}

let Subscription = function (handlerId, unsubscribeNotificationCallback) {
  let self = this;

  self.unsubscribe = () => {
    if (unsubscribeNotificationCallback) {
      unsubscribeNotificationCallback(handlerId);
    }
  };

  return self;
};

let Subject = function (subscribersStateChangeNotificationCallback) {
  let self = this;

  let handlers = {};

  Object.defineProperty(self, 'subscribersFound', {
    get() {
      let found = false;

      for (const prop in handlers) {
        if (handlers.hasOwnProperty(prop)) {
          found = true;
          break;
        }
      }

      return found;
    }
  });

  Object.defineProperty(self, 'subscribersCount', {
    get() {
      let count = 0;

      for (const prop in handlers) {
        if (handlers.hasOwnProperty(prop)) {
          count++;
        }
      }

      return count;
    }
  });

  let unsubscribeNotificationCallback = (handlerId) => {
    if (handlerId && handlerId !== '' && handlers.hasOwnProperty(handlerId)) {
      delete handlers[handlerId];

      if (subscribersStateChangeNotificationCallback && !self.subscribersFound) {
        subscribersStateChangeNotificationCallback(false);
      }
    }
  };

  self.subscribe = (handler) => {
    let handlerId = createGuid();
    handlers[handlerId] = handler;

    if (subscribersStateChangeNotificationCallback && self.subscribersCount === 1) {
      subscribersStateChangeNotificationCallback(true);
    }

    return new Subscription(handlerId, unsubscribeNotificationCallback);
  };

  self.next = (data) => {
    for (const handlerId in handlers) {
      handlers[handlerId](data);
    }
  };

  return self;
};

let createGuid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
