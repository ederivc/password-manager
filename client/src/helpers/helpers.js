const removeCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1950 00:00:01 GMT;`;
};

const setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `;expires="${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value || ""}${expires};Secure`;
};

const getCookie = (name) => {
  let a = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`);
  return a ? a[1] : "";
};

export { removeCookie, setCookie, getCookie };
