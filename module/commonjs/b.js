const { val, setVal } = require('./a.js');

console.log(val);

setVal(100);

console.log(val);

/**
 * 结果
 * 1
 * 1、
 * 因为 commonjs导出的是支的拷贝
 */
