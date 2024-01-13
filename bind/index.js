/**
 * bind 返回的是一个绑定上下文的函数
 * 1.指定 this
 * 2 传入参数
 * 3 返回一个函数
 * 4 柯里化
 */

Function.prototype.newBind = function (ctx) {
  // 调用 bind 的不是函数，需要抛出异常
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable');
  }
  // eslint-disable-nect-line @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const fn = this;
  const args = [...arguments].slice(1);
  return function () {
    const innerArgs = [...arguments];
    return fn.apply(ctx, args.concat(innerArgs));
  };
};

/**
 * deepClone map  为了解决循环引用
 */
const isArray = (target) => {
  return Object.prototype.toString.call(target) === '[object Array]';
};

function deepClone(target, map = new Map()) {
  if (typeof target === 'object') {
    let clone = isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    } else {
      map.set(target, clone);
    }
    for (let key in target) {
      clone[key] = deepClone(target[key], map);
    }
  } else {
    return target;
  }
}
