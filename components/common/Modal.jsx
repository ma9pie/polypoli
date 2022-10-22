import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#modal");

function Modal(props) {
  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      zIndex: 999,
    },
    content: {
      top: props.top,
      left: props.left,
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%,-50%)",
      borderRadius: "15px",
      backgroundColor: "var(--bg)",
      margin: props.margin,
      padding: props.padding,
      minWidth: "450px",
      boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.3)",
      zIndex: 999,
    },
  };

  return (
    <ReactModal
      contentLabel="Modal"
      style={customStyles}
      closeTimeoutMS={300}
      isOpen={props.isOpen}
      onAfterOpen={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
    >
      {props.children}
    </ReactModal>
  );
}

export default Modal;

Modal.defaultProps = {
  top: "30%", // 모달 top 위치
  left: "50%", // 모달 left 위치
  padding: "32px", // 모달 패딩
  isOpen: false, // 모달을 열고 닫는 변수
  onAfterOpen: () => {}, // 모달이 열린 후 실행 함수
  onRequestClose: () => {}, // 모달 닫기 실행 함수
};
