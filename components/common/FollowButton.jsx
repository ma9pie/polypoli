import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import React from "react";

function FollowButton(props) {
  return (
    <Wrapper {...props} disabled={props.disabled}>
      {props.text}
    </Wrapper>
  );
}

export default FollowButton;

FollowButton.defaultProps = {
  text: "팔로우",
  backgroundColor: "var(--brand100)",
  onClick: () => {},
};

const Wrapper = styled.button`
  ${Styles.tiny_m}
  width: 70px;
  height: 25px;
  line-height: 25px;
  border: 0px;
  border-radius: 5px;
  background-color: ${(props) => props.backgroundColor};
  visibility: ${(props) => props.visibility};
  color: white;
  text-align: center;
  outline: none;
  cursor: pointer;
`;
