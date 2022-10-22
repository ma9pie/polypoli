import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "@/redux/modules/page";
import NotificationButton from "@/common/NotificationButton";
import SearchButton from "@/common/SearchButton";
import Styles from "@/common/Styles";
import LogoBetaSvg from "@/svg/LogoBeta";

function DefaultHeader() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userState = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  useEffect(() => {
    const { pathname } = router;
    switch (pathname) {
      case "/":
        setTitle("피드");
        break;
      case "/ranking":
        setTitle("국회의원 랭킹");
        break;
      case "/hotbills":
        setTitle("이번주 핫한 법안");
        break;
      case "/profileList":
        setTitle("관심 국회의원 목록");
        break;
      case "/mypage":
        setTitle("마이페이지");
        break;
      case "/bill/[id]":
        setTitle("법안 내용");
        break;
      case "/notification":
        setTitle("알림");
        break;
      case "/search":
        setTitle("검색");
        break;
      case "/profile":
        setTitle("국회의원 프로필");
        break;
      case "/billProcessingStatus":
        setTitle("법안 처리 현황");
        break;
      case "/standingCommitteeAttendance":
        setTitle("상임위원회 출석률");
        break;
      case "/plenarySessionAttendance":
        setTitle("본회의 출석률");
        break;

      default:
        break;
    }
  }, [router]);
  return (
    <Container>
      <Link href="/">
        <a>
          <LogoBetaSvg
            width="115px"
            onClick={() => dispatch(pageActions.setTabNum(0))}
          ></LogoBetaSvg>
        </a>
      </Link>
      <Title>{title}</Title>
      {userState.userKey === -1 ? (
        <LoginBtn onClick={() => router.push("/login")}>로그인</LoginBtn>
      ) : (
        <IconBox>
          <Icon>
            <NotificationButton></NotificationButton>
          </Icon>
          <Icon>
            <SearchButton></SearchButton>
          </Icon>
        </IconBox>
      )}
    </Container>
  );
}

export default DefaultHeader;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  min-width: var(--minWidth);
  max-width: var(--maxWidth);
  height: 60px;
  width: 100%;
  z-index: 999;
  padding: 0px 20px;
`;

const Title = styled.div`
  ${Styles.base_r};

  white-space: nowrap;
`;

const LoginBtn = styled.div`
  ${Styles.small_r};
  color: var(--brand100);
  width: 115px;
  text-align: right;
  font-weight: 700;
  cursor: pointer;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 115px;
  height: 34px;
`;

const Icon = styled.div`
  margin-left: 8px;
  cursor: pointer;
`;
