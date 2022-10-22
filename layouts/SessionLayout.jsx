import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DefaultHeader from "@/components/layout/DefaultHeader";
import TabBar from "@/components/layout/TabBar";

function SessionLayout({ children }) {
  const router = useRouter();
  const userState = useSelector((state) => state.user);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (userState.userKey === -1) {
      router.push("/");
    } else {
      setIsLogin(true);
    }
  }, [router]);

  return (
    <>
      {isLogin && (
        <LayoutContainer>
          <DefaultHeader></DefaultHeader>
          <Body>{children}</Body>
          <TabBar></TabBar>
        </LayoutContainer>
      )}
    </>
  );
}

export default SessionLayout;

const LayoutContainer = styled.div``;
const Body = styled.div`
  padding-top: 60px;
`;
