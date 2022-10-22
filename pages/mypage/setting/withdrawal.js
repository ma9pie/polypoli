import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/redux/modules/user";
import SettingLayout from "@/layouts/SettingLayout";
import ModalUtils from "@/utils/ModalUtils";
import UserAPI from "@/api/UserAPI";

function Withdrawal() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const withdrawal = () => {
    UserAPI.deleteUser(userState.userKey);
    dispatch(userActions.logout());
    router.push("/");
  };

  return (
    <Container>
      <Title>정말 탈퇴하시는 건가요..?</Title>
      <DescriptionBox>
        <Description delay="1s">
          계정을 삭제하면 나의 지역구 국회의원, 관심 국회의원 목록, 투표 여부
          설정 등 모든 계정 정보가 삭제됩니다.
        </Description>
        <Description delay="1.7s">
          또한 재가입시 다시 자신의 지역구를 설정해야하는 등의 번거로움이
          있어요.
        </Description>
      </DescriptionBox>

      <ButtonBox>
        <Button
          onClick={() =>
            ModalUtils.openConfirm({
              message: "정말 탈퇴하시겠습니까?",
              onRequestConfirm: () => withdrawal(),
            })
          }
        >
          탈퇴하기
        </Button>
      </ButtonBox>
    </Container>
  );
}

export default Withdrawal;

Withdrawal.getLayout = function getLayout(page) {
  return <SettingLayout>{page}</SettingLayout>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
  height: calc(100vh - 60px);
`;

const Title = styled.p`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate3d(0, 50%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  opacity: 0;
  animation: fadeIn 1s ease-in-out forwards;
  animation-delay: 0.3s;

  ${Styles.large_m};
  margin-top: 90px;
`;
const DescriptionBox = styled.div`
  margin-top: 45px;
  padding-bottom: 200px;
`;
const Description = styled.p`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate3d(0, 50%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  opacity: 0;
  animation: fadeIn 1s ease-in-out forwards;
  animation-delay: ${(props) => props.delay};

  ${Styles.base_r};
  color: var(--bg80);
  margin-bottom: 16px;
`;

const ButtonBox = styled.div`
  margin-top: auto;
  margin-bottom: 40px;
`;

const Button = styled.div`
  ${Styles.base_m}
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  padding: 0px;
  border-radius: 10px;
  border: 0px;
  color: var(--bg0);
  background-color: var(--bg60);
  &:hover {
    background-color: var(--brand100);
  }
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
`;
