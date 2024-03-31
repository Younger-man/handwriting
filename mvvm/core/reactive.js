/**
 * 响应式系统的实现思路
 * 1 副作用函数执行触发 数据的getter操作
 * 2 数据个更新触发setter操作
 */

import { track, trigger } from './effect.js';

// 存储副作用函数的😓

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      // 收集依赖: 副作用函数执行 触发数据的getter， 从而可以把当前正在执行的副作用函数存储到桶中
      track(target, key);
      return target[key];
    },
    set(target, key, newVal) {
      console.log('set', key, target);
      target[key] = newVal;
      // 执行副作用函数：数据更新， 从而触发setter操作， 从而把当前存储的副作用函数取出
      trigger(target, key);
      return true;
    },
  });
}
