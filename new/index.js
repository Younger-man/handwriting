/**
 *  首先创一个新的空对象。
 *  根据原型链，设置空对象的 __proto__ 为构造函数的 prototype 。
 *  构造函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）。
 *  判断函数的返回值类型，如果是引用类型，就返回这个引用类型的对象。
 * @param {*} ctx
 * @returns
 */
export function createNew(ctx) {
  const obj = {};
  obj.__proto__ = ctx.prototype;
  //  consr args = Array.prototype.slice.call(arguments, 1)
  const args = [...arguments].slice(1);
  const res = ctx.apply(obj, args);
  /**
   * 其构造函数中返回值 如果是一个对象则需要返回这个对象 否砸则返回创建的对象
   */
  return typeof res === 'object' ? res : obj;
}
