import Chevron from "@/common/Chevron";
import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";

function Dropdown(props) {
  const ref = useRef(null);
  const [isOpenList, setIsOpenList] = useState(false);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpenList(false);
    }
  };

  // 드롭다운 영역 바깥 클릭 시 리스트 닫기
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <Container ref={ref} onClick={() => setIsOpenList(!isOpenList)}>
      <Wrapper {...props}>
        <Selected {...props}>{props.value || props.placeholder}</Selected>
        <Chevron type="down"></Chevron>
      </Wrapper>
      {isOpenList && (
        <ListContainer>
          {props.list.map((item, key) => (
            <List key={key} onClick={() => props.setValue(item)}>
              <Text>{item}</Text>
            </List>
          ))}
        </ListContainer>
      )}
    </Container>
  );
}

export default Dropdown;

Dropdown.defaultProps = {
  width: "100%",
  height: "40px",
  color: "var(--bg100)",
};

const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 0px 16px;
  border: 1px solid var(--bg60);
  border-radius: 10px;
  cursor: pointer;
`;
const Selected = styled.div`
  ${Styles.base_r};
  color: ${(props) => (props.value === "" ? "var(--bg80)" : "var(--text)")};
  width: 90%;
`;

const ListContainer = styled.div`
  position: absolute;
  top: ${(props) => props.height};
  left: 2px;
  z-index: 1;
  width: 98%;
  height: 300px;
  box-shadow: 1px 1px 3px 1px var(--bg60);
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const List = styled.div`
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  &:hover {
    color: var(--bg100);
    background-color: var(--bg20);
  }
  & * {
    color: inherit;
    background-color: inherit;
  }
`;

const Text = styled.div`
  margin: auto 16px;
`;
