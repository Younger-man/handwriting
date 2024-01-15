/**
 * 原型式继承
 * 缺点： 原型式继承 相当于 浅拷贝，所以会导致 引用类型 被多个实例篡改
 * @param {y} proto
 * @returns
 */
function object(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

const cat = {
  name: 'Lolita',
  friends: ['Yancey', 'Sayaka', 'Mitsuha'],
  say() {
    console.log(this.name);
  },
};

const cat1 = object(cat);
cat1.say();
