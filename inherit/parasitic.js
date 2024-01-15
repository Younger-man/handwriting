/**
 * 寄生式继承
 */

const cat = {
  name: 'Lolita',
  friends: ['Yancey', 'Sayaka', 'Mitsuha'],
  say() {
    console.log(this.name);
  },
};

function createAnother(original) {
  const clone = Object.create(original); // 获取源对象的副本

  clone.gender = 'female';

  clone.fly = function () {
    // 增强这个对象
    console.log('I can fly.');
  };

  return clone; // 返回这个对象
}

const cat1 = createAnother(cat);
