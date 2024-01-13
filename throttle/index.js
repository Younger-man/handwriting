/**
 * 节流
 */

export function throttle(fn, wait = 50) {
  let previous = 0;
  return function (...args) {
    let now = +new Date();
    if (now - previous > wait) {
      previous = +now;
      fn.apply(this, args);
    }
  };
}

/**
 * new 操作
 */
function createNew(con) {
  const obj = {};
  obj.__protp__ = con.prototype; //
  const args = [...arguments].splice(1);
  const res = obj.apply(con, args);
  return typeof res === 'object' ? res : obj;
}

Function.prototype.newCall = function (ctx) {
  ctx.fn = this;
  const args = [...arguments].slice(1);
  const result = ctx.fn(...args);
  delete ctx.fn;
  return result;
};

Function.prototype.newApply = function (ctx) {};

Function.prototype.newBind = function (ctx) {
  const fn = this;
  const args = [...arguments].slice(1);
  return function () {
    const innerArgs = [...arguments];
    return fn.apply(ctx, args.concat(innerArgs));
  };
};
