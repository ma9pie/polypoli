import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/**
 * @deprecated
 * ModalUtils로 더 간단하게 모달을 생성할 수 있으므로
 * 리덕스를 이용한 모달은 더이상 사용되지 않음
 * 2022-09-12 @author K_Junyyy
 */

//초기 상태
const initialState = {
  onAfterOpen: () => {},
  onAfterClose: () => {},

  isOpenAlert: false,
  alertTitle: "",
  alertMessage: "",

  isOpenConfirm: false,
  confirmTitle: "",
  confirmMessage: "",
  onRequestConfirm: () => {},

  isOpenInfo: false,
  infoTitle: "",
  infoMessage: "",
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Alert
    openAlert(state, action) {
      state = { ...initialState };
      state.isOpenAlert = true;
      state.alertTitle = action.payload.title;
      state.alertMessage = action.payload.message;
      state.onAfterOpen = action.payload.onAfterOpen;
      state.onAfterClose = action.payload.onAfterClose;
      return state;
    },
    closeAlert(state, action) {
      state.isOpenAlert = false;
      return state;
    },

    // Confirm
    openConfirm(state, action) {
      state = { ...initialState };
      state.isOpenConfirm = true;
      state.confirmTitle = action.payload.title;
      state.confirmMessage = action.payload.message;
      state.onAfterOpen = action.payload.onAfterOpen;
      state.onAfterClose = action.payload.onAfterClose;
      state.onRequestConfirm = action.payload.onRequestConfirm;
      return state;
    },
    closeConfirm(state, action) {
      state.isOpenConfirm = false;
      return state;
    },

    // Info
    openInfo(state, action) {
      state = { ...initialState };
      state.isOpenInfo = true;
      state.infoTitle = action.payload.title;
      state.infoMessage = action.payload.message;
      state.onAfterOpen = action.payload.onAfterOpen;
      state.onAfterClose = action.payload.onAfterClose;
      return state;
    },
    closeInfo(state, action) {
      state.isOpenInfo = false;
      return state;
    },
  },
});

export const modalActions = { ...modal.actions };

export default modal;
