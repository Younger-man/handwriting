/**
 * 组合继承：使用原型链实现对原型方法的继承，并借用构造函数来实现对实例属性的继承
 * 缺点 ：它却调用了两次父
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
  Vehicle.call(this, '汽油'); // 第二次调用父类
}

Car.prototype = new Vehicle(); // 第一次调用父类

// 修正构造函数的指向
Car.prototype.constructor = Car;

Car.prototype.playMusic = function () {
  console.log('sing~');
};

const car = new Car(4);
car.playMusic();
