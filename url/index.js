/**
 * 实现一个方法 获取URL中的query参数
 */

const getUrlParams = (url) => {
  const obj = {};
  const parserUrl = url.split('#').shift();
  parserUrl.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => {
    obj[k] = v;
  });
  return obj;
};

const url = 'http://sample.com/?a=1&b=2&c=xx&d=2#hash';
console.log(url, getUrlParams(url));

// const reg = /([^?=&]+)=([^&])/g;
