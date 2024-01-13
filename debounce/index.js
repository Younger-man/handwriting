/**
 * 防抖
 */

export function debounce(fn, wait = 50, immediate) {
  let time = null;
  return function (...args) {
    if (time) {
      clearTimeout(time);
    }
    /**
     * 第一次出发
     */
    if (immediate && !time) {
      fn.apply(this, args);
    }
    time = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
