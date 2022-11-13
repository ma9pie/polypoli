import axios from "@/api/index.js";

let FeedAPI = {};

FeedAPI.getFeed = (userKey, page) => {
  return axios.post(
    "api/v1/feed",
    {
      userKey: userKey,
    },
    {
      params: {
        page: page,
        size: 10,
      },
    }
  );
};

FeedAPI.getAllFeed = (page) => {
  return axios.get("api/v1/allFeed", {
    params: {
      page: page,
      size: 10,
    },
  });
};

export default FeedAPI;
