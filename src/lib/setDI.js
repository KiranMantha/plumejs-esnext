import { isArray, $args, foreach, isString } from "./utils";
import Injector from "./injector";

const setDI = (fn, deps) => {
  let di = [],
    finalArr = [],
    func_deps = deps && deps.length > 0 ? deps : [];
  if (func_deps.length > 0) {
    func_deps.map((o) => {
      if (o !== 'props') {
        let depsrvc = Injector.get(o);
        if (depsrvc) di.push(depsrvc); else throw Error(`${o} is not a registered provider.`);
      }
    });
  }
  finalArr = [fn, di];
  return finalArr;
}

export default setDI;
