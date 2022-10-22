import styled from "@emotion/styled";
import React, { useState } from "react";
import SearchBill from "@/components/search/SearchBill";
import SearchCongressman from "@/components/search/SearchCongressman";
import Styles from "@/common/Styles";
import SessionLayout from "@/layouts/SessionLayout";

function Search() {
  const [tabNum, setTabNum] = useState(1);

  return (
    <Container>
      {/* 검색 탭 */}
      <TabContainer>
        <TabBox>
          <Tab
            color={tabNum === 2 ? "var(--bg60)" : ""}
            onClick={() => setTabNum(1)}
          >
            국회의원
          </Tab>
          <Tab
            color={tabNum === 1 ? "var(--bg60)" : ""}
            onClick={() => setTabNum(2)}
          >
            법안
          </Tab>
        </TabBox>
        <TabSilder
          left={tabNum === 1 ? "calc(25% - 35px)" : "calc(75% - 35px)"}
        ></TabSilder>
      </TabContainer>

      {tabNum === 1 && <SearchCongressman></SearchCongressman>}
      {tabNum === 2 && <SearchBill></SearchBill>}
    </Container>
  );
}

export default Search;

Search.getLayout = function getLayout(page) {
  return <SessionLayout>{page}</SessionLayout>;
};

const Container = styled.div``;

const TabContainer = styled.div`
  position: relative;
  margin-bottom: 34px;
`;
const TabBox = styled.div`
  display: flex;
  height: 37px;
`;
const Tab = styled.div`
  ${Styles.base_m};
  width: 50%;
  line-height: 37px;
  color: ${(props) => props.color};
  text-align: center;
  cursor: pointer;
`;
const TabSilder = styled.div`
  position: absolute;
  width: 70px;
  height: 3px;
  border: 0px;
  border-radius: 10px;
  border-top: 3px solid var(--iconFill);
  left: ${(props) => props.left};
  transition: left 0.3s ease-in-out;
`;
