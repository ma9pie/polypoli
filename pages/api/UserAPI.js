import axios from "./index.js";

let UserAPI = {};

UserAPI.getUser = (userKey) => {
  return axios.get("api/v1/user", {
    params: {
      userKey: userKey,
    },
  });
};
UserAPI.login = (userId, userPassword) => {
  return axios.get("api/v1/login", {
    params: {
      userId,
      userPassword,
    },
  });
};

UserAPI.getUserByKakaoToken = (kakaoToken) => {
  return axios.get("api/v1/user/kakao", {
    params: {
      kakaoToken: kakaoToken,
    },
  });
};

UserAPI.getUserByUserId = (userId) => {
  return axios.get("api/v1/userByUserId", {
    params: {
      userId: userId,
    },
  });
};
UserAPI.getUserByPhoneNumber = (userPhoneNumber) => {
  return axios.get("api/v1/userByPhoneNumber", {
    params: {
      userPhoneNumber: userPhoneNumber,
    },
  });
};
UserAPI.getUserByUserName = (userName) => {
  return axios.get("api/v1/userByUserName", {
    params: {
      userName: userName,
    },
  });
};
UserAPI.getUserList = () => {
  return axios.get("api/v1/userList", {});
};
UserAPI.createUser = (userId, userPhoneNumber, kakaoId) => {
  return axios.post("api/v1/user", {
    userId: userId,
    userPhoneNumber: userPhoneNumber,
    kakaoId: kakaoId,
  });
};
UserAPI.deleteUser = (userKey) => {
  console.log(userKey);
  return axios.delete("api/v1/user", {
    params: {
      userKey: userKey,
    },
  });
};
UserAPI.checkUserId = (userId) => {
  return axios.get("api/v1/userId", {
    params: {
      userId: userId,
    },
  });
};
UserAPI.checkUserPassword = (userId, password) => {
  return axios.get("api/v1/userPassword", {
    params: {
      userId: userId,
      password: password,
    },
  });
};
UserAPI.setUserRegionAndProfile = (userRegionAndProfileData) => {
  return axios.put("api/v1/userRegionAndProfile", userRegionAndProfileData);
};
UserAPI.updateUserRegion = (userRegionData) => {
  return axios.put("api/v1/userRegion", userRegionData);
};
UserAPI.updateUserProfile = (userProfileData) => {
  return axios.put("api/v1/userProfile", userProfileData);
};
UserAPI.updateUserPassword = (userId, userPassword) => {
  return axios.post("api/v1/userPassword", {
    userId: userId,
    userPassword: userPassword,
  });
};
UserAPI.updateUserPhoneNumber = (userKey, userPhoneNumber) => {
  return axios.post("api/v1/userPhoneNumber", {
    userKey: userKey,
    userPhoneNumber: userPhoneNumber,
  });
};
UserAPI.updateUserStamp = (userKey, userStamp) => {
  return axios.patch("api/v1/userStamp", {
    userKey: userKey,
    userStamp: userStamp,
  });
};
UserAPI.updateUserFollowings = (userKey, following) => {
  return axios.post("api/v1/userFollowings", {
    userKey: userKey,
    following: following,
  });
};

export default UserAPI;
