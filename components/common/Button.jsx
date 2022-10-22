import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import React from "react";

function Button(props) {
  return (
    <Wrapper {...props} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </Wrapper>
  );
}

export default Button;

Button.defaultProps = {
  width: "100%",
  height: "45px",
  margin: "0px",
  padding: "0px",
  onClick: () => {},
};

const Wrapper = styled.button`
  ${Styles.base_m}
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  color: var(--bg0);
  border-radius: 10px;
  border: 0px;
  background-color: ${(props) =>
    props.disabled ? "var(--bg60)" : "var(--brand100)"};
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
`;
