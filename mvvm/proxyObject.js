/**
 * 对象有可能的读取操作
 *  1  访问属性
 *  2 判断是否有某个属性 key in obj
 *  3 使用for in  遍历
 */

//  1 访问属性  这个可以使用get拦截

const obj = {
  name: 'why',
  age: 18,
  height: 1.88,
};

const p = new Proxy(obj, {
  get(target, key, receiver) {
    console.log('get方法被调用了', key);
    return Reflect.get(target, key, receiver);
  },
});

// 判断是否有某个属性  key in obj  可以通过has来拦截

const p2 = new Proxy(obj, {
  has(target, key) {
    console.log('has方法被调用了', key);
    return Reflect.has(target, key);
  },
});
