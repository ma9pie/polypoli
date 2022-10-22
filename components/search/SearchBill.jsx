import Input from "@/common/Input";
import Loading from "@/common/Loading";
import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import debounce from "lodash/debounce";
import Link from "next/link";
import React, { useState } from "react";
import BillAPI from "@/api/BillAPI";
import ArrowRightCircleSvg from "@/svg/ArrowRightCircle";

function SearchBill() {
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  // 법안 검색
  const handleSearchWord = debounce((e) => {
    const { value } = e.target;
    const tmpSearchWord = value.trim();
    if (tmpSearchWord === "") {
      setSearchResult([]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      BillAPI.searchBills(tmpSearchWord).then((res) => {
        setSearchResult(res.data);
        setSearchCompleted(true);
        setIsLoading(false);
      });
    }
  }, 300);
  return (
    <Container>
      <InputBox>
        <Input
          icon={true}
          placeholder="법안 검색"
          onChange={handleSearchWord}
        ></Input>
      </InputBox>

      {isLoading && <Loading top="50%"></Loading>}

      {searchCompleted && (
        <ResultText>{`총 ${searchResult.length}건`}</ResultText>
      )}
      <Divider></Divider>

      {searchResult.length !== 0 && (
        <ListContainer>
          {searchResult.map((item, key) => (
            <ListBox key={key}>
              <Content>{item.title}</Content>
              <Link href={`bill/${item.billId}`}>
                <Icon>
                  <ArrowRightCircleSvg fill="var(--iconFill)"></ArrowRightCircleSvg>
                </Icon>
              </Link>
            </ListBox>
          ))}
        </ListContainer>
      )}
    </Container>
  );
}

export default SearchBill;

const Container = styled.div`
  ${Styles.base_r}
  padding-bottom: 80px;
`;

const InputBox = styled.div`
  margin: 20px;
`;

const ResultText = styled.div`
  ${Styles.base_m};
  padding: 0px 20px 10px 20px;
`;

const ListContainer = styled.div``;

const ListBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 73px;
  padding: 0px 20px;
  border-bottom: 1px solid var(--bg40);
`;
const Divider = styled.div`
  border-bottom: 1px solid var(--bg40);
`;

const Content = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 6px;
`;

const Icon = styled.div`
  cursor: pointer;
`;
