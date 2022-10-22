import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "@/redux/modules/page";
import { userActions } from "@/redux/modules/user";
import SettingLayout from "@/layouts/SettingLayout";
import ModalUtils from "@/utils/ModalUtils";

function Setting() {
  const dispatch = useDispatch();
  const router = useRouter();

  // 로그아웃
  const logout = () => {
    const { origin } = window.location;
    router.push(
      `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&logout_redirect_uri=${origin}/`
    );
    dispatch(userActions.logout());
    dispatch(pageActions.setTabNum(0));
  };

  return (
    <Container>
      <MenuContainer>
        <Menu
          onClick={() =>
            ModalUtils.openAlert({
              message: "삭제 예정",
            })
          }
        >
          계정/정보 관리
        </Menu>
        <Menu
          onClick={() =>
            ModalUtils.openAlert({
              message: "삭제 예정",
            })
          }
        >
          비밀번호 재설정
        </Menu>
        <Menu
          onClick={() =>
            ModalUtils.openConfirm({
              message: "로그아웃하시겠습니까?",
              onRequestConfirm: () => logout(),
            })
          }
        >
          로그아웃
        </Menu>
        <Menu onClick={() => router.push("setting/withdrawal")}>탈퇴하기</Menu>
      </MenuContainer>
    </Container>
  );
}

export default Setting;

Setting.getLayout = function getLayout(page) {
  return <SettingLayout>{page}</SettingLayout>;
};

const Container = styled.div`
  margin: 0px 20px;
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
