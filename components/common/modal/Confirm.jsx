import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import React from "react";
import ReactModal from "react-modal";

function Confirm(props) {
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
      minWidth: "290px",
      backgroundColor: "var(--bg)",
      margin: props.margin,
      padding: props.padding,
      boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.3)",
      zIndex: 1000,
    },
  };

  ReactModal.setAppElement("#confirm-modal");
  return (
    <ReactModal
      contentLabel="Confirm Modal"
      closeTimeoutMS={200}
      style={customStyles}
      isOpen={props.isOpen}
      onAfterOpen={() => props.onAfterOpen()}
      onAfterClose={() => props.onAfterClose()}
      onRequestClose={() => props.onRequestClose()}
    >
      <TextBox>
        {props.component()}
        {props.message.split("\n").map((text, idx) => (
          <Text key={idx}>{text}</Text>
        ))}
      </TextBox>
      <Divider></Divider>
      <BtnBox>
        <CancleBtnText
          onClick={() => {
            props.onRequestClose();
            props.onRequestCancle();
          }}
        >
          {props.cancleBtnText}
        </CancleBtnText>
        <VerticalLine></VerticalLine>
        <ConfirmBtnText
          onClick={() => {
            props.onRequestClose();
            props.onRequestConfirm();
          }}
        >
          {props.confirmBtnText}
        </ConfirmBtnText>
      </BtnBox>
    </ReactModal>
  );
}

export default Confirm;

Confirm.defaultProps = {
  isOpen: false, // 모달을 열고 닫는 변수
  top: "50%", // 모달 top 위치
  left: "50%", // 모달 left 위치
  message: "message", // 모달 메시지
  cancleBtnText: "취소", // 취소 버튼 텍스트
  confirmBtnText: "확인", // 확인 버튼 텍스트
  onAfterOpen: () => {}, // 모달이 열린 후 실행 함수
  onAfterClose: () => {}, // 모달이 닫힌 후 실행 함수
  onRequestClose: () => {}, // 모달 닫기 실행 함수
  onRequestConfirm: () => {}, // 확인 버튼 클릭 시 실행
  onRequestCancle: () => {}, // 취소 버튼 클릭 시 실행
};

const TextBox = styled.div`
  margin: 25px 30px;
`;
const Text = styled.p`
  ${Styles.small_r}
  text-align: center;
  white-space: nowrap;
`;
const Divider = styled.hr`
  margin: 0px;
  border: 0px;
  border-top: 1px solid var(--bg40);
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  cursor: pointer;
`;
const CancleBtnText = styled.p`
  ${Styles.base_m};
  width: 100%;
  text-align: center;
  color: var(--neutual100);
  user-select: none;
`;

const VerticalLine = styled.div`
  height: 100%;
  border: 0px;
  border-left: 1px solid var(--bg40);
`;

const ConfirmBtnText = styled.p`
  ${Styles.base_m};
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: var(--bg60);
  user-select: none;
`;
