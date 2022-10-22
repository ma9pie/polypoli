import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import React from "react";
import ReactModal from "react-modal";
import CloseSvg from "@/svg/Close";

function Info(props) {
  ReactModal.setAppElement("#info-modal");
  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      backdropFilter: "blur(3px)",
      zIndex: 1000,
    },
    content: {
      top: props.top,
      left: props.left,
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%,-50%)",
      borderRadius: "15px",
      border: "1px solid var(--bg40)",
      width: "320px",
      backgroundColor: "var(--bg)",
      margin: props.margin,
      padding: props.padding,
      boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.3)",
      zIndex: 1000,
    },
  };

  return (
    <ReactModal
      contentLabel="Info Modal"
      closeTimeoutMS={200}
      style={customStyles}
      isOpen={props.isOpen}
      onAfterOpen={() => props.onAfterOpen()}
      onAfterClose={() => props.onAfterClose()}
      onRequestClose={() => props.onRequestClose()}
    >
      <Top>
        <Title>{props.title}</Title>
        <CloseBtn onClick={() => props.onRequestClose()}>
          <CloseSvg></CloseSvg>
        </CloseBtn>
      </Top>
      <Divider></Divider>
      <TextBox>
        {props.component()}
        {props.message.split("\n").map((text, idx) => (
          <Text key={idx}>{text}</Text>
        ))}
      </TextBox>
    </ReactModal>
  );
}

export default Info;

Info.defaultProps = {
  isOpen: false, // 모달을 열고 닫는 변수
  top: "50%", // 모달 top 위치
  left: "50%", // 모달 left 위치
  title: "제목", // 모달 제목
  message: "message", // 모달 메시지
  onAfterOpen: () => {}, // 모달이 열린 후 실행 함수
  onAfterClose: () => {}, // 모달이 닫힌 후 실행 함수
  onRequestClose: () => {}, // 모달 닫기 실행 함수
};

const Top = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  padding: 22px 27px 18px 27px;
`;
const Title = styled.div`
  ${Styles.small_m};
  grid-column: 2;
  text-align: center;
`;

const CloseBtn = styled.div`
  grid-column: 3;
  cursor: pointer;
`;

const TextBox = styled.div`
  margin: 25px 30px;
`;
const Text = styled.p`
  ${Styles.small_r};
  margin-bottom: 16px;
`;
const Divider = styled.hr`
  margin: 0px;
  border: 0px;
  border-top: 1px solid var(--bg40);
`;
