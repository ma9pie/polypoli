import styled from "@emotion/styled";
import React from "react";
import TestHeader from "@/components/layout/TestHeader";

function TestLayout({ children }) {
  return (
    <LayoutContainer>
      <TestHeader></TestHeader>
      {children}
    </LayoutContainer>
  );
}

export default TestLayout;

const LayoutContainer = styled.div``;
