import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabNum: 0,
};

const page = createSlice({
  name: "page",
  initialState,
  reducers: {
    setTabNum: (state, action) => {
      return {
        ...state,
        tabNum: action.payload,
      };
    },
  },
});

export const pageActions = { ...page.actions };

export default page;
