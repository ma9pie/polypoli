import Button from "@/common/Button";
import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";
import SignupLayout from "@/layouts/SignupLayout";

function Completion() {
  const router = useRouter();
  return (
    <Container>
      <TextBox>
        <Text>카카오 계정 연동을 통한</Text>
        <Text>회원가입이 완료되었습니다.</Text>
      </TextBox>
      <ButtonBox>
        <Button
          onClick={() => {
            router.push("/signup/region");
          }}
        >
          시작하기
        </Button>
      </ButtonBox>
    </Container>
  );
}

export default Completion;

Completion.getLayout = function getLayout(page) {
  return <SignupLayout>{page}</SignupLayout>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
  height: calc(100vh - 70px);
`;

const TextBox = styled.div`
  text-align: center;
  padding-top: 170px;
  padding-bottom: 230px;
  height: 85%; ;
`;
const Text = styled.p`
  ${Styles.large_m}
  line-height:30px;
  opacity: 0;
  animation: fadeIn 1.5s ease-in-out forwards;
`;

const ButtonBox = styled.div`
  margin-top: auto;
  margin-bottom: 40px;
`;
