// 简易版call 方法实现
Function.prototype.newCall = function (ctx) {
  if (typeof this !== 'function') {
    throw Error('Type Error');
  }
  let result = null;
  let args = [...arguments].slice(1);
  //   let args = Array.prototype.slice.call(arguments, 1);
  ctx = ctx || window;
  ctx.fn = this;
  result = ctx.fn(...args);
  delete ctx.fn;
  return result;
};

const obj = {
  a: 1,
  value: null,
};

function fn(b) {
  console.log(this.value, this.a, b);
}
fn.newCall(obj, 111);
