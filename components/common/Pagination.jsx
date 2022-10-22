import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

function Pagination(props) {
  const { currentPageNum, totalPageNum, displayPageNum, changePage } = props;

  const [pageList, setPageList] = useState([]);

  // 페이지 표시
  // const isShow = (pageNum) => {
  //   const quotient = Math.floor((pageNum - 1) / displayPageNum);
  //   const start = quotient * displayPageNum + 1;
  //   const last = (quotient + 1) * displayPageNum;

  //   return start <= currentPageNum && currentPageNum <= last;
  // };

  useEffect(() => {
    let tmpList = [];
    let tmpStartNum =
      Math.floor((currentPageNum - 1) / displayPageNum) * displayPageNum + 1;
    let tmpEndNum = tmpStartNum + displayPageNum - 1;
    if (tmpStartNum < 1) {
      tmpStartNum = 1;
    }
    if (tmpEndNum > totalPageNum) {
      tmpEndNum = totalPageNum;
    }
    for (let i = tmpStartNum; i <= tmpEndNum; i++) {
      tmpList.push(i);
    }
    setPageList(tmpList);
  }, [currentPageNum, totalPageNum]);

  return (
    <Wrapper {...props}>
      <Container>
        {/* 이전 페이지 버튼 */}
        {pageList.length > 0 && (
          <Icon onClick={() => changePage(currentPageNum - 1)}>
            <PageLeft></PageLeft>
          </Icon>
        )}

        {/* 페이지 숫자 */}
        <PageContainer>
          {pageList.map((item, idx) => (
            <PageNum
              {...props}
              key={idx}
              backgroundColor={currentPageNum === item ? "var(--bg20)" : ""}
              onClick={() => changePage(item)}
            >
              {item}
            </PageNum>
          ))}
        </PageContainer>

        {/* 다음 페이지 버튼 */}
        {pageList.length > 0 && (
          <Icon onClick={() => changePage(currentPageNum + 1)}>
            <PageRight></PageRight>
          </Icon>
        )}
      </Container>
    </Wrapper>
  );
}

export default Pagination;

Pagination.defaultProps = {
  width: "300px",
  margin: "auto",
  currentPageNum: 1, // 현재 페이지
  totalPageNum: 0, // 총 페이지 수
  displayPageNum: 5, // 페이지 번호 표시 수
  changePage: () => {},
};

const PageLeft = () => {
  return (
    <svg width="11" height="16" viewBox="0 0 11 16" fill="none">
      <path d="M9 2L3 8L9 14" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
};

const PageRight = () => {
  return (
    <svg width="11" height="16" viewBox="0 0 11 16" fill="none">
      <path d="M2 14L8 8L2 2" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
};

const Wrapper = styled.div`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  user-select: none;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Icon = styled.div`
  margin-top: 2px;
  padding: 0px 16px;
  cursor: pointer;
`;

const PageContainer = styled.div`
  display: flex;
`;
const PageNum = styled.div`
  ${Styles.ExtBody}
  background-color: ${(props) => props.backgroundColor};
  color: var(--mainText);
  margin: 0px 2px;
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  border-radius: 6px;
  transition: background-color 0.1s;
  cursor: pointer;

  &:hover {
    background-color: var(--bg20);
  }
`;
