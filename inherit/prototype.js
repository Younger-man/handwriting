/**
 * 多个实例对引用类型的操作会被篡改
 * 子类型的原型上的 constructor 属性被重写了
 * 给子类型原型添加属性和方法必须在替换原型之后
 * 创建子类型实例时无法向父类型的构造函数传参
 */

function Vehicle(powerSource) {
  this.powerSource = powerSource;
  this.components = ['座椅', '轮子'];
}
Vehicle.prototype.run = function () {
  console.log('running~');
};

function Car(wheelNumber) {
  this.wheelNumber = wheelNumber;
}

// 将父构造函数的实例赋值给子构造函数的原型
Car.prototype = new Vehicle();

Car.prototype.playMusic = function () {
  console.log('sing~');
};
const car1 = new Car(4);
car1.playMusic();
