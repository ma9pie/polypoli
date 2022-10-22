import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "@/redux/modules/page";
import FireSvg from "@/svg/Fire";
import FireFillSvg from "@/svg/FireFill";
import HomeSvg from "@/svg/Home";
import HomeFillSvg from "@/svg/HomeFill";
import ListSvg from "@/svg/List";
import ListFillSvg from "@/svg/ListFill";
import PersonBadgeSvg from "@/svg/PersonBadge";
import PersonBadgeFillSvg from "@/svg/PersonBadgeFill";
import TrophySvg from "@/svg/Trophy";
import TrophyFillSvg from "@/svg/TrophyFill";
import kakao_guest_login_btn from "@/images/kakao_guest_login_btn.svg";

function TabBar(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userState = useSelector((state) => state.user);
  const tabNum = useSelector((state) => state.page.tabNum);
  const [kakaoAuthUrl, setKakaoAuthUrl] = useState();

  useEffect(() => {
    const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const REDIRECT_URI = window.location.origin + "/oauth/callback/kakao";
    setKakaoAuthUrl(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    );
  }, []);

  const chageTabNum = (num) => {
    dispatch(pageActions.setTabNum(num));
    router.push("/");
  };

  return (
    <Wrapper>
      {userState.userKey === -1 ? (
        <LoginBtnWrapper>
          <LoginBtn onClick={() => router.push(kakaoAuthUrl)}>
            <Image
              src={kakao_guest_login_btn}
              alt="kakao_guest_login_btn"
            ></Image>
          </LoginBtn>
        </LoginBtnWrapper>
      ) : (
        <TabContainer>
          <Icon onClick={() => chageTabNum(0)}>
            {tabNum === 0 ? (
              <HomeFillSvg fill="var(--iconFill)"></HomeFillSvg>
            ) : userState.theme === "Dark" ? (
              <HomeSvg fill="var(--bg80)"></HomeSvg>
            ) : (
              <HomeSvg></HomeSvg>
            )}
          </Icon>
          <Icon onClick={() => chageTabNum(1)}>
            {tabNum === 1 ? (
              <TrophyFillSvg fill="var(--iconFill)"></TrophyFillSvg>
            ) : userState.theme === "Dark" ? (
              <TrophySvg fill="var(--bg80)"></TrophySvg>
            ) : (
              <TrophySvg></TrophySvg>
            )}
          </Icon>
          <Icon onClick={() => chageTabNum(2)}>
            {tabNum === 2 ? (
              <FireFillSvg fill="var(--iconFill)"></FireFillSvg>
            ) : userState.theme === "Dark" ? (
              <FireSvg fill="var(--bg80)"></FireSvg>
            ) : (
              <FireSvg></FireSvg>
            )}
          </Icon>
          <Icon onClick={() => chageTabNum(3)}>
            {tabNum === 3 ? (
              <PersonBadgeFillSvg fill="var(--iconFill)"></PersonBadgeFillSvg>
            ) : userState.theme === "Dark" ? (
              <PersonBadgeSvg fill="var(--bg80)"></PersonBadgeSvg>
            ) : (
              <PersonBadgeSvg></PersonBadgeSvg>
            )}
          </Icon>
          <Icon onClick={() => chageTabNum(4)}>
            {tabNum === 4 ? (
              <ListFillSvg fill="var(--iconFill)"></ListFillSvg>
            ) : userState.theme === "Dark" ? (
              <ListSvg fill="var(--bg80)"></ListSvg>
            ) : (
              <ListSvg></ListSvg>
            )}
          </Icon>
        </TabContainer>
      )}
    </Wrapper>
  );
}

export default TabBar;

const Wrapper = styled.div`
  position: fixed;
  bottom: 0px;
  min-width: var(--minWidth);
  max-width: var(--maxWidth);
  width: 100%;
  z-index: 999;
`;
const TabContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0px 11px;
  height: 55px;
  background-color: var(--bg);
  & * {
    background-color: inherit;
  }
`;
const Icon = styled.div`
  padding: 0px 25px;
  user-select: none;
  cursor: pointer;
`;

const LoginBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0px;
  min-width: var(--minWidth);
  max-width: var(--maxWidth);
  width: 100%;
  height: 55px;
  cursor: pointer;
`;
const LoginBtn = styled.div``;
