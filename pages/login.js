import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LoginLayout from "@/layouts/LoginLayout";
import kakao_login_btn from "@/images/kakao_login_btn.svg";
import polypoli_logo_beta from "@/images/polypoli_logo_beta.svg";

function Login() {
  const router = useRouter();
  const [kakaoAuthUrl, setKakaoAuthUrl] = useState();
  useEffect(() => {
    const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const REDIRECT_URI = window.location.origin + "/oauth/callback/kakao";
    setKakaoAuthUrl(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    );
  }, []);
  return (
    <Wrapper>
      <Logo>
        <Image src={polypoli_logo_beta} alt="polypoli_logo_beta"></Image>
      </Logo>

      <Button onClick={() => router.push(kakaoAuthUrl)}>
        <Image src={kakao_login_btn} alt="kakao_login_btn"></Image>
      </Button>
    </Wrapper>
  );
}

export default Login;

Login.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
`;

const Logo = styled.div`
  position: absolute;
  top: 40%;
  left: 52%;
  transform: translate(-50%, -50%);
`;
const Button = styled.div`
  width: 320px;
  height: 50px;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;
