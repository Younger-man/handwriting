/**
 * 防抖
 */

function debounce(fn, wait, immediate) {
  let time = null;
  return function (...agrs) {
    if (time) {
      clearTimeout(time);
    }
    if (immediate && !time) {
      fn.apply(this, agrs);
    }
    time = setTimeout(() => {
      fn.apply(this, agrs);
    }, wait);
  };
}

/**
 * 节流  n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
 */

function throttle(fn, wait) {
  let previous = 0;
  return function (...args) {
    const now = +new Date();
    if (now - previous > wait) {
      previous = now;
      fn.apply(this, args);
    }
  };
}
