export function setCookie(name, value, days, domain = '.zte.com.cn') {
  // 设置 cookie
  let item = name + '=' + encodeURIComponent(value) + ';path=/' + ';domain=' + domain;
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    item += ';expires=' + date.toUTCString();
  }
  document.cookie = item;
}

export function getCookie(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  return reg ? unescape(reg[2]) : null;
}

export function removeCookie(name, domain = '.zte.com.cn') {
  setCookie(name, '', -1, domain);
}
