const PENDING = 'pending'; // 声明一个常量PENDING，表示Promise的初始状态
const FULFILLED = 'fulfilled'; // 声明一个常量FULFILLED，表示Promise的成功状态
const REJECTED = 'rejected'; // 声明一个常量REJECTED，表示Promise的失败状态

class MyPromise {
  constructor(executor) {
    this.state = PENDING; // 初始化Promise的状态为PENDING
    this.value = undefined; // 初始化Promise的值为undefined
    this.reason = undefined; // 初始化Promise的失败原因为undefined
    this.onFulfilledCallbacks = []; // 存储Promise成功状态下的回调函数
    this.onRejectedCallbacks = []; // 存储Promise失败状态下的回调函数

    // 定义resolve函数，用于将Promise状态改为FULFILLED，并执行成功状态下的回调函数
    const resolve = (value) => {
      if ((this.state = PENDING)) {
        this.state = FULFILLED; // 将Promise状态改为FULFILLED
        this.value = value; // 存储Promise成功时的值
        this.onFulfilledCallbacks.forEach((fn) => fn()); // 执行所有成功状态下的回调函数
      }
    };

    // 定义reject函数，用于将Promise状态改为REJECTED，并执行失败状态下的回调函数
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED; // 将Promise状态改为REJECTED
        this.reason = reason; // 存储Promise失败时的原因
        this.onRejectedCallbacks.forEach((fn) => fn()); // 执行所有失败状态下的回调函数
      }
    };

    try {
      executor(resolve, reject); // 执行executor函数，并传入resolve和reject参数
    } catch (err) {
      reject(err); // 捕获错误，并将Promise状态改为REJECTED
    }
  }

  // 静态方法resolve，返回一个状态为FULFILLED的Promise实例
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }

  // 静态方法reject，返回一个状态为REJECTED的Promise实例
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  // 静态方法all，接收一个包含多个Promise实例的数组，返回一个新的Promise实例
  static all(promises) {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([]); // 如果传入的数组为空，则直接返回一个状态为FULFILLED的Promise实例
      } else {
        let result = []; // 存储每个Promise实例的执行结果
        let count = 0; // 计数器
        for (let i = 0; i < promises.length; i++) {
          promises[i].then(
            (data) => {
              result[i] = data; // 将每个Promise实例的执行结果存入result数组中
              count++;
              if (count === promises.length) {
                resolve(result); // 当所有Promise实例都执行完毕时，返回包含所有结果的新的Promise实例
              }
            },
            (err) => {
              reject(err); // 如果其中一个Promise实例执行失败，则将新的Promise实例的状态改为REJECTED，并返回失败原因
              return;
            },
          );
        }
      }
    });
  }

  // 静态方法race，接收一个包含多个Promise实例的数组，返回一个新的Promise实例
  static race(promises) {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        resolve(); // 如果传入的数组为空，则直接返回一个状态为FULFILLED的Promise实例
      } else {
        for (let i = 0; i < promises.length; i++) {
          promises[i].then(
            (data) => {
              resolve(data); // 返回第一个执行完毕的Promise实例的结果
            },
            (err) => {
              reject(err); // 如果其中一个Promise实例执行失败，则将新的Promise实例的状态改为REJECTED，并返回失败原因
              return;
            },
          );
        }
      }
    });
  }

  // then方法，用于在Promise的成功和失败状态下执行回调函数，返回一个新的Promise实例
  then(onFulfilled, onRejected) {
    // 如果onFulfilled不是一个函数，则将其更改为返回接收到的值的函数
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function (value) {
        return value;
      };
    }

    // 如果onRejected不是一个函数，则将其更改为抛出接收到的原因的函数
    if (typeof onRejected !== 'function') {
      onRejected = function (reason) {
        throw reason;
      };
    }

    let promise2 = new MyPromise((resolve, reject) => {
      switch (this.state) {
        // 如果Promise当前的状态是PENDING，则将回调函数添加到对应的回调数组中
        case PENDING:
          this.onFulfilledCallbacks.push(() => {
            setTimeout(() => {
              try {
                const value = onFulfilled(this.value);
                if (value instanceof MyPromise) {
                  value.then(resolve, reject);
                } else {
                  resolve(value);
                }
              } catch (err) {
                reject(err);
              }
            }, 0);
          });
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                const value = onRejected(this.reason);
                resolve(value);
              } catch (err) {
                reject(err);
              }
            }, 0);
          });
          break;
        // 如果Promise当前的状态是FULFILLED，则直接执行成功回调函数
        case FULFILLED:
          setTimeout(() => {
            try {
              const value = onFulfilled(this.value);
              resolve(value);
            } catch (err) {
              reject(err);
            }
          }, 0);
          break;
        // 如果Promise当前的状态是REJECTED，则直接执行失败回调函数
        case REJECTED:
          setTimeout(() => {
            try {
              const value = onRejected(this.reason);
              resolve(value);
            } catch (err) {
              reject(err);
            }
          }, 0);
          break;
      }
    });
    return promise2;
  }

  // catch方法，用于捕获Promise的失败状态，并执行回调函数
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // finally方法，无论Promise状态是成功还是失败，都会执行回调函数
  finally(fn) {
    return this.then(
      (value) => {
        fn();
        return value;
      },
      (reason) => {
        fn();
        throw reason;
      },
    );
  }
}
