import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import React from "react";

function AttendanceTable(props) {
  const { list, from, to } = props;

  return (
    <Container>
      {list.map((item, key) => (
        <Row key={key} display={from <= key && key < to ? "flex" : "none"}>
          <Column>{item.date}</Column>
          <Column>{item.contents}</Column>
          <Column
            color={
              item.attendance ? "var(--positive100)" : "var(--negative100)"
            }
          >
            {item.attendance ? "출석" : "결석"}
          </Column>
        </Row>
      ))}
    </Container>
  );
}

export default AttendanceTable;

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
    ${Styles.base_m};
    width: 50px;
    color: ${(props) => props.color};
  }
`;
