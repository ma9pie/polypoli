import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import React from "react";
import SearchIconSvg from "@/svg/SearchIcon";

function Input(props) {
  return (
    <Wrapper {...props}>
      <IconBox display={props.icon ? "" : "none"}>
        <SearchIconSvg></SearchIconSvg>
      </IconBox>

      <InputBox {...props}></InputBox>
    </Wrapper>
  );
}

export default Input;

Input.defaultProps = {
  type: "text",
  icon: false,
  width: "100%",
  height: "45px",
  margin: "0px",
  padding: "0px 10px",
  placeholder: "",
  onChange: () => {},
  onKeyPress: () => {},
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border: 1px solid var(--bg60);
  border-radius: 10px;
`;
const IconBox = styled.div`
  display: ${(props) => props.display};
  height: 18px;
  margin-right: 11px;
  cursor: pointer;
`;

const InputBox = styled.input`
  ${Styles.base_r};
  width: 100%;
  border: 0px;
  outline: none;
`;
