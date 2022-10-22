import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";
import SearchButtonSvg from "@/svg/SearchButton";

function SearchButton() {
  const router = useRouter();
  return (
    <Wrapper onClick={() => router.push("/search")}>
      {router.pathname === "/search" ? (
        <SearchButtonSvg fill="var(--brand100)"></SearchButtonSvg>
      ) : (
        <SearchButtonSvg fill="var(--bg100)"></SearchButtonSvg>
      )}
    </Wrapper>
  );
}

export default SearchButton;

const Wrapper = styled.div`
  position: relative;
`;
