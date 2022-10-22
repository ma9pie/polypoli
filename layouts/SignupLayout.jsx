import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Styles from "@/common/Styles";

function SignupLayout({ children }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    switch (router.pathname) {
      case "/signup/terms":
        setTitle("이용약관 동의");
        setProgress(1);
        break;
      case "/signup/phone":
        setTitle("휴대폰 번호 인증");
        setProgress(2);
        break;
      case "/signup/id":
        setTitle("아이디 생성");
        setProgress(3);
        break;
      case "/signup/password":
        setTitle("비밀번호 생성");
        setProgress(4);
        break;
      case "/signup/completion":
        setTitle("회원가입 완료");
        setProgress(-1);
        break;
      case "/signup/region":
        setTitle("내 지역 설정");
        setProgress(2);
        break;
      case "/signup/profile":
        setTitle("프로필 설정");
        setProgress(4);
        break;
      default:
        break;
    }
  }, [router.pathname]);

  return (
    <LayoutContainer>
      <Title>{title}</Title>
      <Progress display={progress === -1 ? "none" : ""}>
        <FullBar>
          <Bar width={progress * 20}></Bar>
        </FullBar>
      </Progress>
      {children}
    </LayoutContainer>
  );
}

export default SignupLayout;

const LayoutContainer = styled.div``;
const Title = styled.div`
  ${Styles.base_r}
  width: 100%;
  height: 70px;
  line-height: 70px;
  text-align: center;
`;
const Progress = styled.div`
  display: ${(props) => props.display};
  padding: 10px 0px 4px 10px;
`;
const FullBar = styled.div`
  position: absolute;
  width: 80px;
  height: 4px;
  background: #f1f2f4;
  border-radius: 5px;
`;
const Bar = styled.div`
  position: absolute;
  width: ${(props) => `${props.width}px`};
  height: 4px;
  background: #888e95;
  border-radius: 5px;
  z-index: 1;
`;
