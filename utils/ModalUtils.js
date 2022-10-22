import Alert from "@/common/modal/Alert";
import Confirm from "@/common/modal/Confirm";
import Info from "@/common/modal/Info";
import Cookies from "js-cookie";
import debounce from "lodash/debounce";
import ReactDOM from "react-dom/client";
import ControlUtils from "@/utils/ControlUtils";
import CookieUtils from "@/utils/CookieUtils";
import modal_close from "@/images/arrow_left.svg";

const ModalUtils = () => {};

const defaultProps = {
  isOpen: true,
  top: "50%",
  left: "50%",
  message: "message\n message\n message",
  confirmBtnText: "확인",
  cancleBtnText: "취소",
  component: () => {},
  onAfterOpen: () => {},
  onAfterClose: () => {},
  onRequestConfirm: () => {},
  onRequestCancle: () => {},
};

// Alert 모달
ModalUtils.openAlert = (obj) => {
  let props = { ...defaultProps, ...obj };

  const modal = document.getElementById("alert-modal");
  const root = ReactDOM.createRoot(modal);

  const onRequestClose = () => {
    props.isOpen = false;
    root.render(<Alert {...props}></Alert>);
    setTimeout(() => {
      root.unmount();
    }, 200);
  };

  props.onRequestClose = onRequestClose;
  root.render(<Alert {...props}></Alert>);
};

// Confirm 모달
ModalUtils.openConfirm = (obj) => {
  let props = { ...defaultProps, ...obj };

  const modal = document.getElementById("confirm-modal");
  const root = ReactDOM.createRoot(modal);

  const onRequestClose = () => {
    props.isOpen = false;
    root.render(<Confirm {...props}></Confirm>);
    setTimeout(() => {
      root.unmount();
    }, 200);
  };

  props.onRequestClose = onRequestClose;
  root.render(<Confirm {...props}></Confirm>);
};

// Info 모달
ModalUtils.openInfo = (obj) => {
  let props = { ...defaultProps, ...obj };

  const modal = document.getElementById("info-modal");
  const root = ReactDOM.createRoot(modal);

  const onRequestClose = () => {
    props.isOpen = false;
    root.render(<Info {...props}></Info>);
    setTimeout(() => {
      root.unmount();
    }, 200);
  };

  props.onRequestClose = onRequestClose;
  root.render(<Info {...props}></Info>);
};

// Popup 모달
ModalUtils.openPopup = (obj) => {
  let params = {
    top: "50%",
    left: "50%",
    title: "알림",
    message: "",
    doNotSeeText: "오늘 하루 보지 않기",
    confirmBtnText: "확인",
    cookieName: "",
    maxAge: -1,
    component: () => {},
    onAfterOpen: () => {},
    onAfterClose: () => {},
    onRequestDoNotSee: () => {},
  };

  params = { ...params, ...obj };
  const {
    top,
    left,
    title,
    message,
    doNotSeeText,
    confirmBtnText,
    cookieName,
    maxAge,
    component,
    onAfterOpen,
    onAfterClose,
    onRequestDoNotSee,
  } = params;

  // 해당 쿠키가 존재하면 실행 취소
  if (Cookies.get(cookieName)) {
    return;
  }

  const modal = document.getElementById("confirm-modal");
  const modalHtml = `
  <div class="modal-overlay">
    <div class="modal-content" onclick="event.stopPropagation()">
      <div class="modal-title"></div>
      <div class="modal-description">
        <div class="modal-component"></div>
        <div class="modal-message"></div>
      </div>
      <div class="modal-btn-box">
        <div class="modal-sub-btn"></div>
        <div class="modal-main-btn"></div>
      </div>
    </div>
  </div>
  `;

  // debounce 처리
  const _onAfterOpen = debounce(() => {
    onAfterOpen();
  }, 300);
  const _onAfterClose = debounce(() => {
    onAfterClose();
  }, 300);
  const _onRequestDoNotSee = debounce(() => {
    onRequestDoNotSee();
  }, 300);

  // 모달 삭제 함수
  const closeModal = () => {
    modal.style.opacity = 0;
    setTimeout(() => {
      if (modal.firstElementChild) {
        modal.removeChild(modal.firstElementChild);
      }
    }, 200);
    _onAfterClose();
  };

  modal.innerHTML = modalHtml;
  let contentElement = document.getElementsByClassName("modal-content")[0];
  let titleElement = document.getElementsByClassName("modal-title")[0];
  let componentElement = document.getElementsByClassName("modal-component")[0];
  let messageElement = document.getElementsByClassName("modal-message")[0];
  let subBtnElement = document.getElementsByClassName("modal-sub-btn")[0];
  let mainBtnElement = document.getElementsByClassName("modal-main-btn")[0];

  ReactDOM.createRoot(componentElement).render(component());

  titleElement.textContent = title;
  message?.split("\n").map((msg) => {
    const text = document.createElement("p");
    text.textContent = msg;
    messageElement.appendChild(text);
  });
  subBtnElement.textContent = doNotSeeText;
  mainBtnElement.textContent = confirmBtnText;

  subBtnElement.onclick = () => {
    CookieUtils.setCookie(cookieName, true, {
      secure: true,
      "max-age": maxAge,
    });
    _onRequestDoNotSee();
    closeModal();
  };
  mainBtnElement.onclick = () => {
    closeModal();
  };

  contentElement.style.top = top;
  contentElement.style.left = left;
  modal.style.opacity = 1;

  _onAfterOpen();
};

export default ModalUtils;
