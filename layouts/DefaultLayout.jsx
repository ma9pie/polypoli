import styled from "@emotion/styled";
import React from "react";
import DefaultHeader from "@/components/layout/DefaultHeader";
import TabBar from "@/components/layout/TabBar";

function DefaultLayout({ children }) {
  return (
    <LayoutContainer>
      <DefaultHeader></DefaultHeader>
      <Body>{children}</Body>
      <TabBar></TabBar>
    </LayoutContainer>
  );
}

export default DefaultLayout;

const LayoutContainer = styled.div``;
const Body = styled.div`
  padding-top: 60px;
`;
