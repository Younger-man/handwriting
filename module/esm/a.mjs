import { b, setB } from './b.mjs';

console.log('running a.mjs');

console.log('b val', b);

console.log('setB to bb');

setB('bb');

var a = 'a';

function setA(val) {
  a = val;
}

export { a, setA };
