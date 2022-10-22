import CookieUtils from "./CookieUtils";
import Cookies from "js-cookie";

const LoginUtils = () => {};

/**
 * 쿠키에 저장된 accessToken을 조회하여
 * 로그인 상태를 Boolean 형식으로 반환
 */
LoginUtils.isLogin = () => {
  return Cookies.get("accessToken") ? true : false;
};

/*
 * accessToken을 가져오는 함수
 * accessToken이 undefined일 경우 빈문자열 return
 */
LoginUtils.getAccessToken = () => {
  return Cookies.get("accessToken") || "";
};

/**
 * 쿠키에 accessToken을 저장
 * @param {String} accessToken : 쿠키에 저장할 엑세스 토큰
 */
LoginUtils.setLogin = (accessToken) => {
  return Cookies.set("accessToken", accessToken, {
    path: "/",
    domain: window.location.href.split("/")[2].includes("localhost")
      ? ""
      : process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
  });
};

/**
 * 저장된 모든 쿠키 삭제
 */
LoginUtils.logout = (callback) => {};

export default LoginUtils;
