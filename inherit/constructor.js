/**
 * 构造函数继承: 创造子类的时候调用父类的构造函数
 * 该方式只能继承父类的实例属性和方法，不能继承原型上的属性和方法。
 * 解决了 不能给父类穿参数的问题
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

  // 继承父类属性并且可以传参
  Vehicle.call(this, '汽油');
}

Car.prototype.playMusic = function () {
  console.log('sing~');
};

const car = new Car(4);
car.playMusic();
