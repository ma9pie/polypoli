import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "@/redux/modules/user";
import UserAPI from "@/api/UserAPI";

function Kakao() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code"); // 인가코드 받는 부분
    const grant_type = "authorization_code";
    const client_id = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const host = window.location.origin;
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${host}/oauth/callback/kakao&code=${code}`
      )
      .then((res) => {
        // 액세스 토큰 쿠키 저장
        Cookies.set("accessToken", res.data.access_token);
        UserAPI.getUserByKakaoToken(res.data.access_token).then((res) => {
          // 처음 회원가입 시
          if (res.data.userKey === null) {
            UserAPI.createUser(
              res.data.kakaoId,
              res.data.userPhoneNumber,
              res.data.kakaoId
            ).then((res) => {
              dispatch(userActions.setUserKey(res.data.userKey));
              dispatch(userActions.setTheme(localStorage.getItem("theme")));
            });
            // 회원가입 완료 페이지로
            router.push("/signup/completion");
          }
          // 카카오 로그인 연동이 되어있을 시
          else {
            const userState = {
              theme: localStorage.getItem("theme"),
              userKey: res.data.userKey,
              userId: res.data.userId,
              userPhoneNumber: res.data.userPhoneNumber,
              userName: res.data.userName,
              userArea: res.data.userArea,
              userRegion: res.data.userRegion,
              regionCongressmanId: res.data.regionCongressmanId,
              userStamp: res.data.userStamp,
              userGender: res.data.userGender,
              userYearOfBirth: res.data.userYearOfBirth,
              userFollowings: res.data.userFollowings,
              userImg: res.data.userImg,
            };
            dispatch(userActions.login(userState));
            // 피드 페이지로
            router.push("/");
          }
        });
      });
  }, []);

  return <></>;
}

export default Kakao;
