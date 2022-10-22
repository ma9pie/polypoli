import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BellButtonSvg from "@/svg/BellButton";

function NotificationButton() {
  const router = useRouter();

  return (
    <Wrapper onClick={() => router.push("/notification")}>
      {router.pathname === "/notification" ? (
        <BellButtonSvg fill="var(--brand100)"></BellButtonSvg>
      ) : (
        <BellButtonSvg fill="var(--bg100)"></BellButtonSvg>
      )}

      <Counter>{"3"}</Counter>
    </Wrapper>
  );
}

export default NotificationButton;

const Wrapper = styled.div`
  position: relative;
`;
const Counter = styled.div`
  ${Styles.tiny_r}
  position: absolute;
  text-align: center;
  top: -5px;
  left: 20px;
  width: 17px;
  height: 17px;
  line-height: 17px;
  background-color: var(--brand80);
  border-radius: 50%;
  color: white;
`;
