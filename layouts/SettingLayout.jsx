import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SettingHeader from "@/components/layout/SettingHeader";

function SettingLayout({ children }) {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <LayoutContainer>
      <SettingHeader></SettingHeader>
      {children}
    </LayoutContainer>
  );
}

export default SettingLayout;

const LayoutContainer = styled.div``;
