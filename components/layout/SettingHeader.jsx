import NotificationButton from "@/common/NotificationButton";
import SearchButton from "@/common/SearchButton";
import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ArrowLeftSvg from "@/svg/ArrowLeft";

function SettingHeader() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  useEffect(() => {
    const { pathname } = router;
    switch (pathname) {
      case "/mypage/setting":
        setTitle("설정");
        break;
      case "/mypage/setting/withdrawal":
        setTitle("탈퇴하기");
        break;

      default:
        break;
    }
  }, [router]);

  return (
    <Container>
      <GoBackBox>
        <GoBackIcon onClick={() => router.back()}>
          <ArrowLeftSvg></ArrowLeftSvg>
        </GoBackIcon>
      </GoBackBox>
      <Title>{title}</Title>
      <IconBox>
        <Icon>
          <NotificationButton></NotificationButton>
        </Icon>
        <Icon>
          <SearchButton></SearchButton>
        </Icon>
      </IconBox>
    </Container>
  );
}

export default SettingHeader;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin: 0px 20px;
`;

const GoBackBox = styled.div`
  display: flex;
  align-items: center;
  width: 115px;
  height: 34px;
`;
const GoBackIcon = styled.div`
  width: 40px;
  margin: auto 0px;
  cursor: pointer;
`;

const Title = styled.div`
  ${Styles.base_r};

  white-space: nowrap;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 115px;
`;

const Icon = styled.div`
  margin-left: 8px;
  cursor: pointer;
`;
