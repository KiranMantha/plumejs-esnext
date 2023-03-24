/**
 * assets/ui/packages
 * eventloop-tasks.ts
 */
export function taskQueue(fn) {
  const queue = [];
  return function (value) {
    queue.push(value);
    if (queue.length === 1) {
      queueMicrotask(() => {
        const values = queue.slice(0);
        queue.length = 0;
        fn(values);
      });
    }
  };
}
