import setDI from "./setDI";
import { isArray, isFunction } from "./utils";

const instantiate = (klass, props) => {
  let fn,
    deps = [];
  if (isArray(klass)) {
    fn = klass.pop();
    deps = klass;
  } else {
    fn = klass;
  }
  let $deps = setDI(fn, deps),
    instance;
  if (isFunction($deps[0])) {
    if ($deps[1].length > 0) {
      instance = new $deps[0](...$deps[1], props);
    } else {
      instance = new $deps[0](props);
    }
  } else {
    instance = $deps[0];
  }
  return instance;
};

export default instantiate;
