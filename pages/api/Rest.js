import Axios from "axios";
import Cookies from "js-cookie";
import _includes from "lodash/includes";
import NProgress from "nprogress";
import CookieUtils from "@/utils/CookieUtils";
import LoginUtils from "@/utils/LoginUtils";
import ModalUtils from "@/utils/ModalUtils";

const headers = {
  Accept: "*/*",
  "Content-Type": "application/json",
};

NProgress.configure({ showSpinner: false });

const Rest = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL,
  timeout: 15000,
  headers: headers,
});

Rest.interceptors.request.use(
  (req) => {
    NProgress.start();
    req.headers["X-Cashierest-Access-Token"] = LoginUtils.getAccessToken();
    return req;
  },
  (error) => {
    NProgress.done();
    console.log("request error");

    return Promise.reject(error);
  }
);

Rest.interceptors.response.use(
  (res) => {
    NProgress.done();

    const code = res.data.code;
    const message = res.data.message;
    const accessToken = res.headers["x-cashierest-response-access-token"];

    if (accessToken) {
      LoginUtils.setLogin(accessToken);
    }
    console.log(
      "\n============================ REST LOG START ============================="
    );
    console.log(res.request.responseURL);
    console.log(res.data);
    console.log(
      "============================ REST LOG END ===============================\n\n"
    );

    if (code === "0") {
      if (res.data.data) {
        res.data = res.data.data;

        // console.log(
        //   "\n********************************* REST LOG START *********************************"
        // );
        // console.log(res.request.responseURL);
        // console.log(res.data);
        // console.log(
        //   "********************************* REST LOG END  *********************************\n\n");
      }

      res.code = code;
      res.message = message;
    } else {
      if (true) {
        Object.keys(Cookies.get()).forEach(function (cookieName) {
          CookieUtils.deleteCookie(cookieName);
        });
        ModalUtils.openAlert({
          message: `다른 기기에서 로그인이 감지되어 로그아웃되었습니다.\n
          동시에 로그인 가능한 기기는\n
          최대 PC1대, 모바일(태블릿) 1대 입니다.\n
          본인이 시도하지 않은 로그인일 경우,\n
          더보기 > 보안관리 에서 계정잠금을 진행하세요\n`,
          onAfterClose: () => {
            const pathname = window.location.pathname;
            if (pathname !== "/login") {
              window.location.href = "/login";
            }
          },
        });
      } else {
      }
    }

    return Promise.resolve(res);
  },
  (error) => {
    NProgress.done();
    console.log(
      "############################ REST ERROR #################################"
    );
    console.log(error);
    console.log(
      "############################ REST END   #################################"
    );

    const errResult = error.response;

    if (errResult) {
      switch (errResult.status) {
        case 500:
          ModalUtils.openAlert({
            title: "서버오류",
            message: `코드 : ${errResult.data.code}\n${errResult.data.message}`,
          });
          break;

        case 502:
          ModalUtils.openAlert({
            title: "서버오류",
            message: `Bad gateway (${errResult.status})\n${errResult.request.responseURL}`,
          });
          break;

        default:
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default Rest;
