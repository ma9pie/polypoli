import Chevron from "@/common/Chevron";
import Styles from "@/common/Styles";
import Theme from "@/common/Theme";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import SessionLayout from "@/layouts/SessionLayout";
import ModalUtils from "@/utils/ModalUtils";
import GearSvg from "@/svg/Gear";
import GeoAltSvg from "@/svg/GeoAlt";
import HeadsetSvg from "@/svg/Headset";
import ProfileIcon from "@/svg/ProfileIcon";
import ShareSvg from "@/svg/Share";

function Mypage() {
  const router = useRouter();
  const userState = useSelector((state) => state.user);
  const colorList = [
    "#E3E3E3",
    "#E5523E",
    "#A4F028",
    "#FFAB5E",
    "#A4F028",
    "#6BECFE",
  ];

  const [imgNum, setImgNum] = useState(0);

  useEffect(() => {
    if (userState.userImg !== "") {
      setImgNum(userState.userImg);
    }
  }, []);

  const goChangeRegion = () => {
    // ModalUtils.openAlert({
    //   message: `내 지역 변경은 마지막 변경일로부터 \n3개윌 이후에 가능합니다.`,
    // });
    router.push("/mypage/region");
  };

  return (
    <Container>
      <Top onClick={() => router.push("/mypage/profile")}>
        <Title>나의 프로필</Title>
        <Chevron type="right"></Chevron>
      </Top>
      <ProfileBox>
        <ProfileImg>
          <ProfileIcon fill={colorList[imgNum]}></ProfileIcon>
        </ProfileImg>
        <Div>
          <ProfileName>{userState.userName}</ProfileName>
          <ProfileRegion>
            {userState.userArea.split(" ").at(-1)} / {userState.userRegion}
          </ProfileRegion>
        </Div>
      </ProfileBox>
      <MenuContainer>
        <Menu onClick={goChangeRegion}>
          <Icon>
            <GeoAltSvg></GeoAltSvg>
          </Icon>
          <Subtitle>내 지역 변경</Subtitle>
        </Menu>
        <Menu onClick={() => router.push("/mypage/setting")}>
          <Icon>
            <GearSvg></GearSvg>
          </Icon>
          <Subtitle>설정</Subtitle>
        </Menu>
        <Menu
          onClick={() =>
            ModalUtils.openAlert({
              message: "개발 예정",
            })
          }
        >
          <Icon>
            <HeadsetSvg></HeadsetSvg>
          </Icon>
          <Subtitle>문의사항</Subtitle>
        </Menu>
        <CopyToClipboard text={"https://polypoli.kr"}>
          <Menu
            onClick={() => {
              ModalUtils.openAlert({
                message: "링크가 복사되었습니다.",
              });
            }}
          >
            <Icon>
              <ShareSvg></ShareSvg>
            </Icon>
            <Subtitle>링크공유</Subtitle>
          </Menu>
        </CopyToClipboard>
        <Menu>
          <Theme></Theme>
        </Menu>
      </MenuContainer>
    </Container>
  );
}

export default React.memo(Mypage);

Mypage.getLayout = function getLayout(page) {
  return <SessionLayout>{page}</SessionLayout>;
};

const Container = styled.div`
  padding: 0px 20px;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding-right: 16px;
  cursor: pointer;
`;
const Div = styled.div``;
const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  height: 90px;
  margin-bottom: 55px;
`;
const ProfileImg = styled.div`
  margin-right: 25px;
`;
const ProfileName = styled.div`
  ${Styles.base_m}
`;
const ProfileRegion = styled.div`
  ${Styles.tiny_m}
`;
const MenuContainer = styled.div`
  margin: 0px 10px;
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin: 20px 0px;
  cursor: pointer;
`;
const Icon = styled.div`
  margin-right: 20px;
`;
const Title = styled.div`
  ${Styles.base_m}
`;
const Subtitle = styled.div`
  ${Styles.base_r}
`;
