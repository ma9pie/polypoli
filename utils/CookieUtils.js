import Cookies from "js-cookie";

const CookieUtils = () => {};

CookieUtils.getCookie = (name) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

CookieUtils.setCookie = (name, value, options = {}) => {
  options = {
    path: "/",
    domain: window.location.href.split("/")[2].includes("localhost")
      ? ""
      : process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

CookieUtils.deleteCookie = (name) => {
  CookieUtils.setCookie(name, "", {
    "max-age": -1,
  });
};

export default CookieUtils;
