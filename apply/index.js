// 简易版Apply 方法实现
Function.prototype.newApply = function (ctx) {
  if (typeof this !== 'function') {
    throw Error('Type Error');
  }

  let result = null;
  ctx = ctx || window;
  // 与上面代码相比，我们使用 Symbol 来保证属性唯一
  // 也就是保证不会重写用户自己原来定义在 context 中的同名属性
  const fnSymbol = Symbol();
  ctx[fnSymbol] = this;
  // 执行要被调用的方法
  if (arguments[1]) {
    result = ctx[fnSymbol](...arguments[1]);
  } else {
    result = ctx[fnSymbol]();
  }
  delete ctx[fnSymbol];
  return result;
};

const obj = {
  a: 1,
  value: null,
};

function fn(b) {
  console.log(this.value, this.a, b);
}
fn.newApply(obj, [111]);
