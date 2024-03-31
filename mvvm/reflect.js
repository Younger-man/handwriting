const obj = {
  foo: 1,
  get bar() {
    return this.foo;
  },
};

const newObj = new Proxy(obj, {
  get(target, key) {
    console.log(`Getting ${key}!`);
    // 这里并没有用reflect.get
    return target[key];
  },
  set(target, key, value) {
    console.log(`Setting ${key}!`);
    // 这里并没有用reflect.set
    target[key] = value;
    return true;
  },
});

effect(() => {
  console.log(newObj.foo);
});

/**
 * 注解
 *  effect副作用函数在调用的时候会读取newObj.foo，这个是一个访问器属性，读取foo的值， 按道理应该建立effect 与foo 之的联系 ，但是 修改p.foo的时候 并不会出发副作用函数
 * 这是应为这个target[key] 指向了 obj这个原始对象
 *  所以会触发get方法，
 */
