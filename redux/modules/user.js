import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "",
  userStatus: "",

  userKey: -1,
  userId: "",
  userPhoneNumber: "",

  userArea: "",
  userRegion: "",
  regionCongressmanId: 0,

  userImg: "",
  userName: "",
  userYearOfBirth: 0,
  userGender: "",

  userFollowings: "",
  userStamp: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 로그인
    login: (state, action) => {
      return action.payload;
    },
    // 로그아웃
    logout: (state, action) => {
      return initialState;
    },
    // 테마 변경
    setTheme: (state, action) => {
      return {
        ...state,
        theme: action.payload,
      };
    },
    // 유저Key 변경
    setUserKey: (state, action) => {
      return {
        ...state,
        userKey: action.payload,
      };
    },
    // 투표 도장 업데이트
    setUserStamp: (state, action) => {
      return {
        ...state,
        userStamp: action.payload,
      };
    },
    // 휴대폰 번호 업데이트
    setUserPhoneNumber: (state, action) => {
      return {
        ...state,
        userPhoneNumber: action.payload,
      };
    },
    // 지역 변경
    setRegion: (state, action) => {
      return {
        ...state,
        userArea: action.payload.userArea,
        userRegion: action.payload.userRegion,
        regionCongressmanId: action.payload.regionCongressmanId,
      };
    },
    // 프로필 변경
    setProfile: (state, action) => {
      return {
        ...state,
        userImg: action.payload.userImg,
        userName: action.payload.userName,
        userYearOfBirth: action.payload.userYearOfBirth,
        userGender: action.payload.userGender,
      };
    },
    // 유저 팔로잉 설정
    setUserFollowings: (state, action) => {
      console.log(action.payload);
      const tmpState = { ...state };
      let followingsArr = tmpState.userFollowings.split(",");
      if (followingsArr[0] === "") followingsArr = [];
      let newFollowings = "";

      // 팔로잉 시
      if (action.payload.follow) {
        followingsArr.push(action.payload.congressmanId);
      }
      // 언팔로잉 시
      else {
        let index = followingsArr.indexOf(String(action.payload.congressmanId));
        if (index > -1) followingsArr.splice(index, 1);
      }
      newFollowings = followingsArr.join(",");
      return {
        ...state,
        userFollowings: newFollowings,
      };
    },
  },
});

export const userActions = { ...user.actions };

export default user;
