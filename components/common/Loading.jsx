import styled from "@emotion/styled";
import React from "react";
import ReactLoading from "react-loading";

function Loading(props) {
  return (
    <Wrapper {...props}>
      <ReactLoading type="spin" color="var(--text)" height={30} width={30} />
    </Wrapper>
  );
}

export default Loading;

Loading.defaultProps = {
  position: "absolute",
  top: "40%",
  left: "50%",
};

const Wrapper = styled.div`
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: translate(-50%, -50%);
  background-color: transparent;
  & * {
    background-color: inherit;
  }
`;
