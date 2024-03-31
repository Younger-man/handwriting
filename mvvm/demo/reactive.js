import { track, trigger } from './effect.js';

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, newVal, receiver) {
      Reflect.set(target, key, newVal, receiver);
      // target[key] = newVal;

      trigger(target, key);
      return true;
    },
  });
}
