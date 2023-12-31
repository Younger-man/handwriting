const isArray = (target) => {
  return Object.prototype.toString.call(target) === '[object Array]';
};

const deepClone = (target, map = new Map()) => {
  if (typeof target === 'object') {
    // 考虑target是数组
    let clone = isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    } else {
      map.set(target, clone);
    }
    for (let key in target) {
      clone[key] = deepClone(target[key], map);
    }
    return clone;
  } else {
    return target;
  }
};

/**
 * 兼容数组
 */
// const target = {
//   field1: 1,
//   field2: undefined,
//   field3: {
//     child: 'child',
//   },
//   field4: [2, 4, 8],
// };
// const data = deepClone(target);

// target.field2 = 2222;
// console.log('data:', data, target);

/**
 * 循环引用
 */
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child',
  },
  field4: [2, 4, 8],
};
target.target = target;

const data = deepClone(target);

console.log('data:', target, data);
