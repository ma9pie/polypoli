import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";
import ArrowRightCircleSvg from "@/svg/ArrowRightCircle";

function BillTable(props) {
  const router = useRouter();
  const { list, from, to } = props;

  const formatDate = (str) => {
    const tmp = str.split("-");
    return `${tmp[0]} ${tmp[1]}-${tmp[2]}`;
  };

  return (
    <Container>
      {list.map((item, key) => (
        <Row key={key} display={from <= key && key < to ? "flex" : "none"}>
          <Column>{formatDate(item.date)}</Column>
          <Column>{item.title}</Column>
          <Column onClick={() => router.push(`/bill/${item.billId}`)}>
            <ArrowRightCircleSvg fill="var(--iconFill)"></ArrowRightCircleSvg>
          </Column>
        </Row>
      ))}
    </Container>
  );
}

export default BillTable;

const Container = styled.div``;

const Row = styled.div`
  display: ${(props) => props.display};
  align-items: center;
  height: 60px;
`;

const Column = styled.div`
  &:nth-of-type(1) {
    ${Styles.tiny_r};
    width: 30px;
    color: var(--bg80);
  }
  &:nth-of-type(2) {
    ${Styles.small_r};
    width: calc(100% - 60px);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0px 10px;
  }
  &:nth-of-type(3) {
    width: 30px;
    cursor: pointer;
  }
`;
