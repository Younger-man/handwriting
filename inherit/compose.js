function inheritPrototype(child, parent) {
  const prototype = Object.create(parent.prototype); // 创建父类原型的副本
  prototype.constructor = child; // 将副本的构造函数指向子类
  child.prototype = prototype; // 将该副本赋值给子类的原型
}
function Vehicle(powerSource) {
  this.powerSource = powerSource;
  this.components = ['座椅', '轮子'];
}

Vehicle.prototype.run = function () {
  console.log('running~');
};

function Car(wheelNumber) {
  this.wheelNumber = wheelNumber;
  Vehicle.call(this, '汽油');
}

inheritPrototype(Car, Vehicle);

Car.prototype.playMusic = function () {
  console.log('sing~');
};
