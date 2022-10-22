import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import LogoBetaSvg from "@/svg/LogoBeta";

function TestHeader() {
  return (
    <Container>
      <Link href="/">
        <a>
          <LogoBetaSvg width="115px"></LogoBetaSvg>
        </a>
      </Link>
      <Title>연구실</Title>
      <Blank></Blank>
    </Container>
  );
}

export default TestHeader;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin: 0px 20px;
`;

const Logo = styled.div`
  width: 115px;
  height: 34px;
  cursor: pointer;
`;

const Title = styled.div`
  ${Styles.base_r};
  white-space: nowrap;
`;

const Blank = styled.div`
  width: 115px;
  height: 34px;
`;
